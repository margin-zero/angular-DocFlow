import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { PathStep } from '../../datatypes/pathstep';
import { Action } from '../../datatypes/action';

import { FormModelEditPathStep } from '../../datatypes/form-model-classes';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-pathstep-new',
  templateUrl: './admin-pathstep-new.component.html',
  styleUrls: ['./admin-pathstep-new.component.css']
})
export class AdminPathstepNewComponent implements OnInit {

  @ViewChild('f') form: any;

  pathId: number;
  pathSteps: PathStep[];

  actions: Action[];
  responseMessage: string = null;

  formModel: FormModelEditPathStep = new FormModelEditPathStep();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    headerText: 'nazwa-ścieżki',
    subheaderText: 'nowa akcja ścieżki obiegu dokumentów'
    } );

  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }



  ngOnInit() {
    this.backendApiService.getActions().then( actions => this.actions = actions );

    this.subscriptionManager.add(

      this.route.params.subscribe(params => {

        this.pathId = +params['pathId'];

        this.backendApiService.getPath(+params['pathId'])
          .then(path => this.headerConfiguration.headerText = path.name);

        this.backendApiService.getPathSteps(+params['pathId'])
          .then(pathSteps => this.pathSteps = pathSteps);

        this.formButtonConfiguration.cancel.goBack = false;
        this.formButtonConfiguration.cancel.isRelative = true;
        this.formButtonConfiguration.cancel.navigate = '../../../view/' + this.pathId;

      })
    );

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID') || !this.isChanged();
      })
    );

  }



  addNewPathStep(formData: FormModelEditPathStep, isValid: boolean) {

    if (!isValid) { return; }

    this.formModel.step_order = this.getNextStepOrder();
    this.formModel.path_id = this.pathId;

    this.backendApiService.createPathStep(this.formModel).then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.formModel = new FormModelEditPathStep();
        this.responseMessage = null;
        this.backendApiService.refreshPathStepsObservable(this.pathId);
        this.router.navigate(['../../../view/' + this.pathId], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }

    });
  }


  getNextStepOrder(): number {
    let nextStepOrder = 0;
    if (this.pathSteps && this.pathSteps.length > 0) {
      nextStepOrder = Math.max(...this.pathSteps.map( e => e.step_order)) + 1;
    }

    return nextStepOrder;
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
    const emptyForm: FormModelEditPathStep = new FormModelEditPathStep();
    return (JSON.stringify(this.formModel) !== JSON.stringify(emptyForm) );
  }
}
