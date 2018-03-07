import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

import { BackendApiService } from '../services/backend-api/backend-api.service';

@Directive({
  selector: '[dcfUniqueAuthorNameValidator],[validateUniqueAuthorName][ngModel],[uniqueAuthorNameValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UniqueAuthorNameValidatorDirective, multi: true }
  ]
})
export class UniqueAuthorNameValidatorDirective implements Validator, OnInit {

  authornames: string[];

  constructor(
    private backendApiService: BackendApiService
  ) {}

  ngOnInit() {
    this.authornames = [];

    this.backendApiService.getAuthors()
      .then(authors => {
        this.authornames = authors.map( author => author.name );
      });
  }



  validate(control: FormControl): {[key: string]: any} {

    let isValid = true;

    if ( control.value ) {
      for (let i = 0; i < this.authornames.length; i++) {
        if ( this.authornames[i].toLowerCase() === control.value.toLowerCase() ) {
          isValid = false;
        }
      }
    }

    if (isValid) {
      return null;
    } else {
      return { validateUniqueAuthorName: 'validateUniqueAuthorName' };
    }
  }


}
