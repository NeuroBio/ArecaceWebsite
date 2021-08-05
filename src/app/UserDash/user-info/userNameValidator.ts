import { ValidatorFn, AbstractControl } from '@angular/forms';

export function userNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const newName: string = control.value;
        if (!newName.match(/\w/)) {
          return { 'NoLetters': { value: control.value,
                                message: 'You need to have at leats one number, digit, -, or _ in your username.' } };
        }
        // /[\.,\/#!$%\^&;:{}=_`~@\+\?><\[\]\+"]
        const justLetters = newName.replace(/[\W_-\d]/g, '').toLowerCase();
        if (justLetters.match(/fuck/)
        || justLetters.match(/fck/)
        || justLetters.match(/cunt/)
        || justLetters.match(/cnt/)
        || justLetters.match(/bitch/)
        || justLetters.match(/nigger/)
        || justLetters.match(/ngger/)
        || justLetters.match(/nigga/)) {
            return { 'ProfanityFilter': { value: control.value,
                                        message: 'You triggered the profanity filter, so you were probably typing something inappropriate (and not being clever enough about it).  If you weren\'t, my bad!  The filter is pretty blunt.  Feel free to contact me about what you wanted to do, and I\'ll see if I can do something about it!' } };
        }
        return null;
    };
  }
