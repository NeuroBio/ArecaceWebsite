import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  
  ImagesLoadable = new BehaviorSubject<boolean>(true);
  phone: boolean;

  constructor() { }

}
