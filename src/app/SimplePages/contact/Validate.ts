import { ValidatorFn, AbstractControl } from '@angular/forms';

export function messageValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(control.value.search("</?script>") > -1){
          return {'Script': {value: control.value}}
      }
      if(control.value.search("http") > -1){
        return {'Links': {value: control.value}}
      }
      return null
    };
  }