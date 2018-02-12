import { Component, OnInit, Input } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { Group } from '../../datatypes/group';
import { FormModelNewPathStepGroup } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-admin-pathstep-groups',
  templateUrl: './admin-pathstep-groups.component.html',
  styleUrls: ['./admin-pathstep-groups.component.css']
})
export class AdminPathstepGroupsComponent implements OnInit {

  @Input() pathStepId: number;
  @Input() pathId: number;

  groups: Group[];
  formModel: FormModelNewPathStepGroup = new FormModelNewPathStepGroup();

  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {
    this.subscriptionManager.add(
      this.backendApiService.getNotPathStepGroupsObservable().subscribe( groups => {
        this.groups = groups;
        this.formModel.pathstep_id = this.pathStepId;
        this.formModel.path_id = this.pathId;
        if (this.groups.length > 0) {
          this.formModel.group_id = this.groups[0].id;
        } else {
          this.formModel.group_id = null;
        }
      })
    );

    this.backendApiService.refreshNotPathStepGroupsObservable(this.pathStepId);

  }


  saveForm(formData: any, isValid: boolean) {

    if (!isValid || this.formModel.group_id === null) { return; }

    this.backendApiService.createPathStepGroup(this.pathStepId, this.pathId, this.formModel.group_id)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.backendApiService.refreshNotPathStepGroupsObservable(this.pathStepId);
        this.backendApiService.refreshPathStepGroupsObservable(this.pathStepId);
      } else {
        alert(apiResponse.message);
      }
    });
  }

}
