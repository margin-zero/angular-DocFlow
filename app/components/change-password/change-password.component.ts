import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';
import { FormModelChangePassword } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('f') form: any;

  userId: number;
  responseMessage: string = null;

  formModel: FormModelChangePassword = new FormModelChangePassword();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});



  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.userId = this.authenticationService.getUser().id;

    this.formButtonConfiguration.group.isStacked = true;

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID') || !this.isChanged();
      })
    );

  }


  isChanged(): boolean {
    if ((this.formModel.password && this.formModel.password.length > 0) ||
        (this.formModel.confirmPassword && this.formModel.confirmPassword.length > 0) ||
        (this.formModel.oldPassword !== this.authenticationService.getUser().password)) {
          return true;
        } else {
          return false;
    }
  }


  submitForm(isValid: boolean) {

    if (!isValid) { return; }

    if (isValid && this.formModel.oldPassword !== this.authenticationService.getUser().password) {
      this.responseMessage = 'Stare hasło niepoprawne. Hasło nie zostało zmienione.';
      return;
    }

    this.backendApiService.resetPassword(this.userId, this.formModel.password)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        alert('Hasło użytkownika zostało zmienione.');
        this.responseMessage = null;
        this.backendApiService.getUser(this.userId)
          .then(user => {
            this.authenticationService.setUser(user);
          });
        this.location.back();
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
