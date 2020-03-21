import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { take } from 'rxjs/operators';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class SliderService {

  preview = new BehaviorSubject<boolean>(true);

  constructor(private auth: AuthService,
              private firebaseserv: FireBaseService) {
    this.auth.user.pipe(take(1))
    .subscribe(user => {
    if(this.auth.isUser() === true)
       this.preview.next(user.showPreview);
   });
  }

  getPreview() {
    return this.preview.value;
  }

  setPreview(preview: boolean) {
    this.preview.next(preview);
    return this.auth.user.pipe(take(1))
    .subscribe(user => {
      if(this.auth.isUser() === true) {
        user.showPreview = preview;
        this.firebaseserv.editDocument(user, 'Users', this.auth.uid.value);
      }
   });
  }
}
