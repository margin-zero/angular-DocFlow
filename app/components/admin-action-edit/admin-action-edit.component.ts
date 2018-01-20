import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Action } from '../../datatypes/action';
import { FormModelEditAction } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-action-edit',
  templateUrl: './admin-action-edit.component.html',
  styleUrls: ['./admin-action-edit.component.css']
})
export class AdminActionEditComponent implements OnInit {

  @ViewChild('f') form: any;

  action: Action = new Action();
  responseMessage: string;

  formModel: FormModelEditAction = new FormModelEditAction();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});
  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'edycja nazwy akcji'
    } );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) {}


  ngOnInit() {

    this.responseMessage = null;

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getAction(+params['actionId'])
          .then(action => {

            this.headerConfiguration.headerText = action.name;
            this.formModel = action;
            this.action = Object.assign({}, action);

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
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.action) );
  }


  submitForm(formData: FormModelEditAction, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.updateAction(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {

        this.action = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.backendApiService.refreshActionsObservable();
        this.router.navigate(['../../view', this.action.id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
