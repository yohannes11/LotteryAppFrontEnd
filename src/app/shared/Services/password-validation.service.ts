import {AbstractControl} from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class PasswordValidationService {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('newpass').value; // to get value in input tag
    const confirmPassword = AC.get('newpassconfirm').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('newpassconfirm').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }

  static ConfirmPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
