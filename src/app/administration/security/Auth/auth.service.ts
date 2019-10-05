import { Injectable }         from '@angular/core';
import { AngularFireAuth }    from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/Classes/user'; 
import { FirebaseAuth } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  
  authState: any = null;
  user: Observable<User>;

  constructor(private authorize: AngularFireAuth,
                private afs: AngularFirestore){

    this.authorize.authState.subscribe(auth => {
      console.log("trigger 1")
      this.authState = auth;
    });

    this.user = this.authorize.authState.pipe(
      switchMap(user => {
        console.log('trigger 2')
        if (user) {
          return this.afs.doc<User>(`Users/${user.uid}`).valueChanges()
        } else {
          return of (null)
        }
      })
    )
  }


  anonymousLogin() {
    return this.authorize.auth.signInAnonymously()
    .then((credential) =>{
      this.updateUserData(credential.user);
    })
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    if(this.authState){//upgrade anon users
      this.authorize.auth.currentUser.linkWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });

    } else {
      return this.authorize.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
    }
  }

  private updateUserData(user) {
    const data: User = {email: user.email,
                        userName: user.userName,
                        ID: user.ID,
                        roles:user.roles}
    return data;
  }

  logout() {
    this.authorize.auth.signOut();
  }

}