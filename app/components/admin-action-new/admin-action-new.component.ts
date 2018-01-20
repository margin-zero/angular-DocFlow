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
  selector: 'dcf-admin-action-new',
  templateUrl: './admin-action-new.component.html',
  styleUrls: ['./admin-action-new.component.css']
})
export class AdminActionNewComponent implements OnInit {

  @ViewChild('f') form: any;

  actions: Action[];
  responseMessage: string = null;

  formModel: FormModelEditAction = new FormModelEditAction();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    headerText: 'nowa-akcja',
    subheaderText: 'wprowadzanie nowej akcji'
    } );


  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {
    this.backendApiService
      .getActions()
      .then(actions => this.actions = actions);

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
    const emptyForm: FormModelEditAction = new FormModelEditAction();
    return (JSON.stringify(this.formModel) !== JSON.stringify(emptyForm) );
  }


  submitForm(formData: FormModelEditAction, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.createAction(formData)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = new FormModelEditAction();
          this.responseMessage = null;
          this.backendApiService.refreshActionsObservable();
          this.router.navigate(['/admin/action/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });
  }

}
