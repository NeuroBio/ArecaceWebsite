import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  
  ImagesLoadable = false;
  phone: boolean;

  constructor() { }

}
