import { Component, OnInit, Input } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { Group } from '../../datatypes/group';
import { PathStepGroup } from '../../datatypes/pathstepgroup';

import { FormModelNewPathStepGroup } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-admin-pathstep-groups',
  templateUrl: './admin-pathstep-groups.component.html',
  styleUrls: ['./admin-pathstep-groups.component.css']
})
export class AdminPathstepGroupsComponent implements OnInit {

  @Input() pathStepId: number;
  @Input() pathId: number;
  @Input() pathStepGroups: PathStepGroup[];

  groups: Group[] = [];
  allGroups: Group[] = [];

  formModel: FormModelNewPathStepGroup = new FormModelNewPathStepGroup();

  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.backendApiService.getGroups().then(groups => {
      this.allGroups = groups;
      this.refreshGroupList();
      this.formModel.pathstep_id = this.pathStepId;
      this.formModel.path_id = this.pathId;
      if (this.groups.length > 0) {
        this.formModel.group_id = this.groups[0].id;
      } else {
        this.formModel.group_id = null;
      }

    });

  }


  isInPathStepGroups(groupId: number): boolean {
    for (let i = 0; i < this.pathStepGroups.length; i++) {
      if (this.pathStepGroups[i].id === groupId && this.pathStepGroups[i].pathstep_id === this.pathStepId) { return true; }
    }
    return false;
  }


  refreshGroupList() {
    this.groups = [];
    for (let i = 0; i < this.allGroups.length; i++) {
      if (!this.isInPathStepGroups(this.allGroups[i].id)) {
        this.groups.push( this.allGroups[i] );
      }
    }
  }

  removeGroupFromList(groupId: number) {
    let index = -1;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === +groupId) {
        index = i;
      }
    }


    if (index > -1) { this.groups.splice(index, 1); }

    if (this.groups.length > 0) {
      this.formModel.group_id = this.groups[0].id;
    } else {
      this.formModel.group_id = null;
    }
  }


  saveForm(formData: any, isValid: boolean) {

    if (!isValid || this.formModel.group_id === null) { return; }

    this.backendApiService.createPathStepGroup(this.pathStepId, this.pathId, this.formModel.group_id)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        // this.backendApiService.refreshNotPathStepGroupsObservable(this.pathStepId);
        this.backendApiService.refreshPathStepGroupsObservable(this.pathId);
        this.removeGroupFromList(this.formModel.group_id);
      } else {
        alert(apiResponse.message);
      }
    });
  }

}
