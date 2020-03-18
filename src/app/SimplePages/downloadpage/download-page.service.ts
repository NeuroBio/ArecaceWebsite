import { Injectable } from '@angular/core';
import { CacheService } from 'src/app/GlobalServices/cache.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CharacterMetaData, User } from 'src/app/Classes/ContentClasses';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadPageService {

  ImageData = new BehaviorSubject<any>(undefined);
  private stream: Subscription;

  constructor(private cache: CacheService,
              private auth: AuthService) { }

  fetchImageData(index: number, type: string, refIndex: number, user: boolean = false) {
    if(this.stream) {
      this.stream.unsubscribe();
    }
    if(user === true) {
      return this.stream = this.auth.user.subscribe((data: User) =>
        this.assignData(data[type], index, refIndex) );
    }
    return this.stream = this.cache.Cache[type].subscribe((data: any[]) => 
      this.assignData(data, index, refIndex) );
  }

  private assignData(data: any[], index: number, refIndex: number) {
    if(refIndex !== undefined) {
      this.ImageData.next(this.makeRefData(data[index], refIndex)); 
    } else {
      this.ImageData.next(data[index]);
    }
  }

  private makeRefData(char: CharacterMetaData, index: number) {
    let ref: any;
    ref = char.References[index];
    ref.Links = [char.Links[(index+1)*2], char.Links[(index+1)*2+1]];
    return ref;
  }

  dispose() {
    this.stream.unsubscribe();
  }
}
