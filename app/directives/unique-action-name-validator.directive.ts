import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

import { BackendApiService } from '../services/backend-api/backend-api.service';

@Directive({
  selector: '[dcfUniqueActionNameValidator],[validateUniqueActionName][ngModel],[uniqueActionNameValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UniqueActionNameValidatorDirective, multi: true }
  ]
})
export class UniqueActionNameValidatorDirective implements Validator, OnInit {

  names: string[];

  constructor(
    private backendApiService: BackendApiService
  ) {}

  ngOnInit() {

    this.names = [];


    this.backendApiService.getActions()
      .then(actions => {
        this.names = actions.map( action => action.name );
      });
  }


  validate(control: FormControl): {[key: string]: any} {

    let isValid = true;

    if ( control.value ) {
      for (let i = 0; i < this.names.length; i++) {
        if ( this.names[i].trim() === control.value.trim()) {
          isValid = false;
        }
      }
    }

    if (isValid) {
      return null;
    } else {
      return { validateUniqueActionName: 'validateUniqueActionName' };
    }
  }


}
