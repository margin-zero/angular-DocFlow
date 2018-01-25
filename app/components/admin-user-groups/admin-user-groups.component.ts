import { Component, OnInit, Input } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { Group } from '../../datatypes/group';
import { FormModelNewUserGroup } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-admin-user-groups',
  templateUrl: './admin-user-groups.component.html',
  styleUrls: ['./admin-user-groups.component.css']
})
export class AdminUserGroupsComponent implements OnInit {

  @Input() userId: number;

  groups: Group[];
  formModel: FormModelNewUserGroup = new FormModelNewUserGroup();

  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.subscriptionManager.add(
      this.backendApiService.getNotUserGroupsObservable().subscribe( groups => {
        this.groups = groups;
        this.formModel.user_id = this.userId;
        if (this.groups.length > 0) {
          this.formModel.group_id = this.groups[0].id;
        } else {
          this.formModel.group_id = null;
        }
      })
    );

    this.backendApiService.refreshNotUserGroupsObservable(this.userId);
  }

  saveForm(formData: any, isValid: boolean) {

    if (!isValid || this.formModel.group_id === null) { return; }

    this.backendApiService.createUserGroup(this.userId, this.formModel.group_id)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.backendApiService.refreshNotUserGroupsObservable(this.userId);
        this.backendApiService.refreshUserGroupsObservable(this.userId);
      } else {
        alert(apiResponse.message);
      }
    });
  }
}
