import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const confirmPassword = AC.get('confirmPassword').value;
        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
