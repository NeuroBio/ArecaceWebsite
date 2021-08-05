import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GetRouteSegmentsService {

  constructor() { }

  fetch(pathtoRoot: any[], pop: boolean = true): string[] {
    const Path = [];
    if (pop) {
      pathtoRoot.pop(); // remove current final segment
    }
    pathtoRoot.forEach((segment, i) => {
      if (i > 0 && segment.url !== '') { // ignore root and any weirdness I can't explain
        segment.url.forEach(subseg => Path.push(subseg));
      }
    });
    return Path.join('/').split('/');
  }
}


import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class QuickAssign {
  assign(Form: FormGroup, edit: any): FormGroup {
    Object.keys(Form.controls).forEach(key => {
      if (typeof(Form.controls[key].value) !== 'object') {
        if (edit[key] !== undefined) {
          Form.controls[key].patchValue(edit[key]);
        } else {
          Form.controls[key].patchValue('');
        }
      }
    });
    return Form;
  }
}
