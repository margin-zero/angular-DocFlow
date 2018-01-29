import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { PathStep } from '../../datatypes/pathstep';
import { Action } from '../../datatypes/action';

import { FormModelNewPathStep } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-admin-pathstep-new',
  templateUrl: './admin-pathstep-new.component.html',
  styleUrls: ['./admin-pathstep-new.component.css']
})
export class AdminPathstepNewComponent implements OnInit {

  @ViewChild('f') form: any;

  @Input() pathId: number;
  @Input() pathSteps: PathStep[];

  actions: Action[];

  formModel: FormModelNewPathStep = new FormModelNewPathStep();

  constructor(
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {
    this.backendApiService.getActions().then( actions => this.actions = actions );
  }



  addNewPathStep(formData: FormModelNewPathStep, isValid: boolean) {

    if (!isValid) { return; }

    this.formModel.step_order = this.getNextStepOrder();
    this.formModel.path_id = this.pathId;

    this.backendApiService.createPathStep(this.formModel).then(p => {
      this.backendApiService.refreshPathStepsObservable(this.pathId);
    });

    // this.formModel.name = '';
  }

  getNextStepOrder(): number {
    let nextStepOrder = 0;
    if (this.pathSteps && this.pathSteps.length > 0) {
      nextStepOrder = Math.max(...this.pathSteps.map( e => e.step_order)) + 1;
    }

    return nextStepOrder;
  }

}
