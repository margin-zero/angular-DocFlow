import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

import { BackendApiService } from '../services/backend-api/backend-api.service';

@Directive({
  selector: '[dcfUniqueGroupNameValidator],[validateUniqueGroupName][ngModel],[uniqueGroupNameValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UniqueGroupNameValidatorDirective, multi: true }
  ]
})
export class UniqueGroupNameValidatorDirective implements Validator, OnInit {

  names: string[];

  constructor(
    private backendApiService: BackendApiService
  ) {}

  ngOnInit() {

    this.names = [];

    this.backendApiService.getGroups()
      .then(groups => {
        this.names = groups.map( group => group.name );
      });
  }


  validate(control: FormControl): {[key: string]: any} {

    let isValid = true;

    if ( control.value ) {
      for (let i = 0; i < this.names.length; i++) {
        if ( this.names[i] === control.value ) {
          isValid = false;
        }
      }
    }

    if (isValid) {
      return null;
    } else {
      return { validateUniqueGroupName: 'validateUniqueGroupName' };
    }
  }


}
