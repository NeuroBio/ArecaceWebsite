import { Injectable }             from '@angular/core';
import { AngularFireAuth }        from '@angular/fire/auth';

import { of, BehaviorSubject }    from 'rxjs';
import { switchMap, take }        from 'rxjs/operators';

import { auth }                   from 'firebase/app';

import { User }                   from 'src/app/Classes/ContentClasses'; 
import { FireBaseService }        from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  
  authState = null;
  user = new BehaviorSubject<User>(undefined);
  uid = new BehaviorSubject<string>(undefined);

  constructor(private authorize: AngularFireAuth,
              private firebaseserv: FireBaseService) { }

  load() {
    this.authorize.authState.subscribe(auth => {
      this.authState = auth;
    });

    return new Promise(resolve =>
      this.authorize.authState.pipe(switchMap(user => {
        if (user) {
          this.isLoggedIn = true;
          if(user.isAnonymous === false) {
            this.uid.next(user.uid);
            return this.firebaseserv.returnDocument(`Users/${user.uid}`);
          }
        }
        return of (null); //no login or anonlogin
      })
    ).subscribe(user => {
      this.user.next(user);
      resolve(true);
    }) );
  }

  anonymousLogin() {
    return this.authorize.auth.signInAnonymously()
    .then((credential) => {
      this.updateUserData(credential.user, true,
                          credential.additionalUserInfo.isNewUser);
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider, true);
  }

  private oAuthLogin(provider: any, local: boolean) {
    const sessionType = local === true ? 'local' : 'session'; 
    if(this.authState) { //upgrade anon users
      return this.authorize.auth.setPersistence(sessionType)
      .then(() => {return this.authorize.auth.currentUser.linkWithPopup(provider)})
      .then((credential) =>
        this.updateUserData(credential.user, false,
                            credential.additionalUserInfo.isNewUser)
      ).catch(err => //anon user already has an account
        this.authorize.auth.signInWithCredential(err.credential)
      .then((credential) =>
        this.updateUserData(credential.user, false,
                            credential.additionalUserInfo.isNewUser)) );

    } else { //simple login!
      return this.authorize.auth.signInWithPopup(provider)
      .then((credential) =>
        this.updateUserData(credential.user, false,
                            credential.additionalUserInfo.isNewUser));
    }
  }

  isAnon() {
    return this.authState.isAnonymous;
  }

  isUser() {
    if(this.isLoggedIn) {
      if(!this.isAnon()) {
        return this.user.value.User;
      }
    }
    return false;
  }

  isAdmin() {
    if(this.isLoggedIn) {
      if(!this.isAnon()) {
        return this.user.value.Admin;
      }
    }
    return false;
  }

  private updateUserData(user: any, anon: boolean, newUser: boolean) {
    let data: User;
    if(newUser && !anon) {
      return this.firebaseserv.returnCollectionWithKeys('NumUsers').pipe(take(1))
      .subscribe(ID => {
        data = new User(user.email, ID[0].NumUsers);
        this.firebaseserv.editDocument({NumUsers: ID[0].NumUsers += 1}, 'NumUsers', ID[0].key);
        this.firebaseserv.editDocument(data, 'Users', user.uid);
      });
    }
  }

  logout() {
    this.authorize.auth.signOut();
    this.isLoggedIn = false;
  }

  refresh() {
    this.authState.getIdToken(true);
  }

}