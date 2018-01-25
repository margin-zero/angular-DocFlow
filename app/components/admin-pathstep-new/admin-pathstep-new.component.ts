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
    this.formModel.path_id = this.pathId;
    this.formModel.name = 'nowy krok';

  }

  addFirstPathStep() {

      const newPathStep = new PathStep();
      newPathStep.path_id = this.pathId;
      newPathStep.step_order = 1;
      newPathStep.name = 'Wprowadzanie dokumentu';
      newPathStep.action_enter = 'TRUE';
      this.backendApiService.createPathStep(newPathStep).then(p => {
        this.backendApiService.refreshPathStepsObservable(this.pathId);
      });

  }


  addNewPathStep(formData: FormModelNewPathStep, isValid: boolean) {

    this.formModel.step_order = this.getNextStepOrder();

    this.backendApiService.createPathStep(this.formModel).then(p => {
      this.backendApiService.refreshPathStepsObservable(this.pathId);
    });
  }

  getNextStepOrder(): number {
    let maxStepOrder = 0;
    if (this.pathSteps && this.pathSteps.length > 0) {
      maxStepOrder = Math.max(...this.pathSteps.map( e => e.step_order)) + 1;
    }

    alert(maxStepOrder);

    return maxStepOrder;
  }

}
