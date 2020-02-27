import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  
  ImagesLoadable = false;
  phone: boolean;

  constructor() { }

}
