import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  ImagesLoadable = new BehaviorSubject<boolean>(true);
  phone = new BehaviorSubject<boolean>(undefined);

  constructor(private deviceserv: DeviceDetectorService) {
    this.phone.next(this.deviceserv.isMobile());
  }

}
