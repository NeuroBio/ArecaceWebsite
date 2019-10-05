import { Injectable }         from '@angular/core';
import { AngularFireAuth }    from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { of, BehaviorSubject } from 'rxjs'
import { switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/Classes/user'; 
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  
  authState: any = null;
  user = new BehaviorSubject(null)

  constructor(private authorize: AngularFireAuth,
              private firebaseserv: FireBaseService) {

    this.authorize.authState.subscribe(auth => {
      this.authState = auth;
    });

    this.authorize.authState.pipe(switchMap(user => {
        if (user) {
          this.isLoggedIn = true;
          return this.firebaseserv.returnDocument(`Users/${user.uid}`);
        } else {
          return of (null);
        }
      })
    ).subscribe(user => this.user.next(user));
  }



  anonymousLogin() {
    return this.authorize.auth.signInAnonymously()
    .then((credential) =>{
      this.updateUserData(credential.user, true,
                          credential.additionalUserInfo.isNewUser);
    })
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }



  private oAuthLogin(provider) {
    if(this.authState){ //upgrade anon users
      this.authorize.auth.currentUser.linkWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user, false,
                            credential.additionalUserInfo.isNewUser);

      }).catch(err => { //anon user already has an account
        this.authorize.auth.signInAndRetrieveDataWithCredential(err.credential)
        .then((credential) => {
          this.updateUserData(credential.user, false,
                              credential.additionalUserInfo.isNewUser);
        });
      });

    } else { //simple login!
      return this.authorize.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user, false,
                            credential.additionalUserInfo.isNewUser);
      });
    }
  }

  private updateUserData(user: any, anon: boolean, newUser: boolean) {
    let data: User;
    if(newUser && !anon){
      return this.firebaseserv.returnCollectionWithKeys('NumUsers').pipe(take(1))
      .subscribe(ID => {
        data = {email: user.email,
          userName: 'defaultUserName_2.0',
          ID: ID[0].NumUsers,
          roles: [true, false]};
        this.firebaseserv.editDocument({NumUsers: ID[0].NumUsers += 1}, 'NumUsers', ID[0].key);
        this.firebaseserv.editDocument(data, 'Users', user.uid);
      });
    }
  }

  logout() {
    this.authorize.auth.signOut();
    this.isLoggedIn = false;
  }

}