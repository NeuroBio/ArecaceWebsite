import { Injectable }         from '@angular/core';
import { AngularFireAuth }    from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/Classes/user'; 

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  
  
  user: Observable<User>;

  constructor(private authorize: AngularFireAuth,
                private afs: AngularFirestore){ 

    this.user = this.authorize.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`Users/${user.uid}`).valueChanges()
        } else {
          return of (null)
        }
      })
    )
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.authorize.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
  private updateUserData(user) {
    const data: User = {
      email: user.email,
      userName: user.userName,
      ID: user.ID,
      roles:user.roles
    }
    return data
  }

  logout() {
    this.authorize.auth.signOut();
  }

}