import { Injectable }                     from '@angular/core';

import { BehaviorSubject, Subscription }  from 'rxjs';

import { CacheService }                   from 'src/app/GlobalServices/cache.service';
import { AuthService }                    from 'src/app/administration/security/Auth/auth.service';

import { CharacterMetaData, User }        from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class DownloadPageService {

  ImageData = new BehaviorSubject<any>(undefined);
  real: boolean;
  private stream: Subscription;

  constructor(private cache: CacheService,
              private auth: AuthService) { }

  fetchImageData(index: number, type: string, refIndex: number, user: boolean = false) {
    if(this.stream) {
      this.stream.unsubscribe();
    }
    if(user === true) {
      this.real = false;
      return this.stream = this.auth.user.subscribe((data: User) =>
        this.assignData(data[type], index, refIndex) );
    }
    this.real = true;
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
