import { Injectable }         from '@angular/core';
import { AngularFireAuth }    from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of, BehaviorSubject } from 'rxjs'
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
    console.log("log in anon")
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

    // return this.user.pipe(take(1)).subscribe(fb => {
      // console.log("fb piped and return!")
      // console.log(fb)
      // if(fb.roles){ //returning user
      //   data = {email: fb.email,
      //     userName: fb.userName,
      //     ID: fb.ID,
      //     roles: fb.roles};
      // } else { //new user!
      if(newUser && !anon){
        data = {email: user.email,
          userName: 'defaultUserName_2.0',
          ID: 2,
          roles: [true, false]};
        this.firebaseserv.editDocument(data, 'Users', user.uid);
      }
    // return data
    // })
  }

  logout() {
    this.authorize.auth.signOut();
    this.isLoggedIn = false;
  }

}