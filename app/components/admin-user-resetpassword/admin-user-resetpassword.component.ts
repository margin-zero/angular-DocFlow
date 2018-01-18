import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';
import { FormModelChangePassword } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-user-resetpassword',
  templateUrl: './admin-user-resetpassword.component.html',
  styleUrls: ['./admin-user-resetpassword.component.css']
})
export class AdminUserResetpasswordComponent implements OnInit {

  @ViewChild('f') form: any;

  userId: number;
  returnPath: string;
  responseMessage: string = null;

  formModel: FormModelChangePassword = new FormModelChangePassword();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'resetowanie hasła'
  });


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(this.route.params.subscribe(params => {

      this.userId = params['userId'];
      this.backendApiService.getUser(+params['userId'])
        .then(user => {this.headerConfiguration.headerText = user.username; });

      this.returnPath = '../../view/' + params['userId'];

      this.formButtonConfiguration.cancel.goBack = false;
      this.formButtonConfiguration.cancel.navigate = this.returnPath;
      this.formButtonConfiguration.cancel.isRelative = true;
      })
    );

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID') || !this.isChanged();
      })
    );

  }


  // @HostListener detects navigating out of your current location via router but also
  //               by closing browser's window, typing in new url etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // return true - change location without user confirmation
    // return false - shows "OK/Cancel" dialog before navigation
    return !this.isChanged();
  }


  isChanged(): boolean {
    if ((this.formModel.password && this.formModel.password.length > 0) ||
        (this.formModel.confirmPassword && this.formModel.confirmPassword.length > 0)) {
          return true;
        } else {
          return false;
    }
  }


  submitForm(isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.resetPassword(this.userId, this.formModel.password)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        alert('Hasło użytkownika zostało zmienione.');
        this.responseMessage = null;
        this.formModel = new FormModelChangePassword();
        this.router.navigate([this.returnPath], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
