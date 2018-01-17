import { Component, OnInit, Input } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { User } from '../../datatypes/user';
import { FormModelNewUserGroup } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-admin-group-users',
  templateUrl: './admin-group-users.component.html',
  styleUrls: ['./admin-group-users.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminGroupUsersComponent implements OnInit {

  @Input() groupId: number;

  users: User[] = [];
  formModel: FormModelNewUserGroup = new FormModelNewUserGroup(); // It's "universal" class for UserGroup and GroupUser

  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.subscriptionManager.add(
      this.backendApiService.getNotGroupUsersObservable().subscribe( users => {
        this.users = users;
        this.formModel.group_id = this.groupId;
        if (this.users.length > 0) {
          this.formModel.user_id = this.users[0].id;
        } else {
          this.formModel.user_id = null;
        }
      })
    );

    this.backendApiService.refreshNotUserGroupsObservable(this.groupId);
  }

  saveForm(formData: any, isValid: boolean) {

    if (!isValid || this.formModel.user_id === null) { return; }

    this.backendApiService.createUserGroup(this.formModel.user_id, this.groupId)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.backendApiService.refreshNotGroupUsersObservable(this.groupId);
        this.backendApiService.refreshGroupUsersObservable(this.groupId);
      } else {
        alert(apiResponse.message);
      }
    });
  }
}
