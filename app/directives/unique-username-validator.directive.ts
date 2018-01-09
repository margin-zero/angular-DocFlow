import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

import { BackendApiService } from '../services/backend-api/backend-api.service';

@Directive({
  selector: '[dcfUniqUsernameValidator],[validateUniqueUsername][ngModel],[uniqueUsernameValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true }
  ]
})
export class UniqueUsernameValidatorDirective implements Validator, OnInit {

  usernames: string[];

  constructor(
    private backendApiService: BackendApiService
  ) {}

  ngOnInit() {
    this.usernames = [];

    this.backendApiService.getUsers()
      .then(users => {
        for (let i = 0; i < users.length ; i++ ) {
          this.usernames.push(users[i].username);
        }
      });
  }



  validate(control: FormControl): {[key: string]: any} {

    let isValid = true;

    for (let i = 0; i < this.usernames.length; i++) {
      if ( this.usernames[i] === control.value.trim()) {
        isValid = false;
      }
    }

    if (isValid) {
      return null;
    } else {
      return { validateUniqueUsername: 'validateUniqueUsername' };
    }
  }


}
