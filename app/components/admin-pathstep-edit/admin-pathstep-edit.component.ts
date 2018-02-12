import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { PathStep } from '../../datatypes/pathstep';
import { FormModelEditPathStep } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-pathstep-edit',
  templateUrl: './admin-pathstep-edit.component.html',
  styleUrls: ['./admin-pathstep-edit.component.css']
})
export class AdminPathstepEditComponent implements OnInit {

  @ViewChild('f') form: any;

  pathstep: PathStep = new PathStep();
  responseMessage: string;

  formModel: FormModelEditPathStep = new FormModelEditPathStep();

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
        this.backendApiService.getPathStep(+params['pathStepId'])
          .then(pathstep => {

            this.headerConfiguration.headerText = pathstep.name;
            this.formModel = pathstep;
            this.pathstep = Object.assign({}, pathstep);

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
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.pathstep) );
  }



  submitForm(formData: FormModelEditPathStep, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.updatePathStep(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {

        this.pathstep = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.backendApiService.refreshPathStepsObservable(this.pathstep.path_id);
        this.router.navigate(['../../../view', this.pathstep.path_id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
