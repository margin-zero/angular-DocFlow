import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';
import { FormModelEditUser } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';



@Component({
  selector: 'dcf-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminUserEditComponent implements OnInit {

  @ViewChild('f') form: any;

  user: User = new User();
  responseMessage: string;

  formModel: FormModelEditUser = new FormModelEditUser();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});
  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'edycja konta'
    } );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) {}


  ngOnInit() {

    this.responseMessage = null;

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getUser(+params['userId'])
          .then(user => {

            this.headerConfiguration.headerText = user.username;
            this.formModel = user;
            this.user = Object.assign({}, user);

          });
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
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.user) );
  }


  submitForm(formData: FormModelEditUser, isValid: boolean) {

    if (!isValid) { return; }

    if (!this.formModel.is_user) { this.formModel.is_user = 'FALSE'; }

    this.backendApiService.updateUser(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {

        if (this.formModel.id === this.authenticationService.getUser().id) {
          this.authenticationService.setUser(this.formModel);
        }
        this.user = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.router.navigate(['../../view', this.user.id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
