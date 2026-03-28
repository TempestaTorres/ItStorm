import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  static creditCardNumberValidator(control: AbstractControl): ValidationErrors | null {

    const result: boolean = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(control.value);

    return result ? null : {number: {value: control.value}};
  }
  static creditCardExpirationValidator(control: AbstractControl): ValidationErrors | null {

    const result: boolean = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(control.value);

    return result ? null : {expire: {value: control.value}};
  }
  static creditCardCvvValidator(control: AbstractControl): ValidationErrors | null {

    const result: boolean = /^[0-9]{3}$/.test(control.value);

    return result ? null : {cvv: {value: control.value}};
  }

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const result: boolean = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(control.value);

    return result ? null : {pattern: {value: control.value}};
  }
}
