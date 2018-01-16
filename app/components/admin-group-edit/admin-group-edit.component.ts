import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Group } from '../../datatypes/group';
import { FormModelEditGroup } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
// import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminGroupEditComponent implements OnInit {

  @ViewChild('f') form: any;

  group: Group = new Group();
  responseMessage: string;

  formModel: FormModelEditGroup = new FormModelEditGroup();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});
  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'edycja nazwy grupy'
    } );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    // private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) {}


  ngOnInit() {

    this.responseMessage = null;

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getGroup(+params['groupId'])
          .then(group => {

            this.headerConfiguration.headerText = group.name;
            this.formModel = group;
            this.group = Object.assign({}, group);

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
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.group) );
  }


  submitForm(formData: FormModelEditGroup, isValid: boolean) {

    if (!isValid) { return; }

    // if (!this.formModel.is_user) { this.formModel.is_user = 'FALSE'; }

    this.backendApiService.updateGroup(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {

        this.group = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.backendApiService.refreshGroupsObservable();
        this.router.navigate(['../../view', this.group.id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
