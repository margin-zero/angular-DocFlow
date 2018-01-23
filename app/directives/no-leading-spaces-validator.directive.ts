import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
@Directive({
  selector: '[dcfNoLeadingSpacesValidator],[validateNoLeadingSpaces][ngModel],[noLeadingSpacesValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NoLeadingSpacesValidatorDirective, multi: true }
  ]
})
export class NoLeadingSpacesValidatorDirective {

  constructor() {}

  validate(control: FormControl): {[key: string]: any} {

    let isValid = true;

    if ( control.value.trim().length !== control.value.length ) {
          isValid = false;
    }

    if (isValid) {
      return null;
    } else {
      return { validateNoLeadingSpaces: 'validateNoLeadingSpaces' };
    }
  }

}
