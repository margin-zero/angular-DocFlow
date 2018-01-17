import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-user-groups-delete',
  templateUrl: './admin-user-groups-delete.component.html',
  styleUrls: ['./admin-user-groups-delete.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminUserGroupsDeleteComponent implements OnInit {

  userId: number;
  groupId: number;

  groupName: string;

  responseMessage: string;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({
    reset: {isVisible: false},
    cancel: { value: 'nie usuwaj'},
    submit: { value: 'usuń', disabled: false}
  });

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'usuwanie użytkownika z grupy'
    } );

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.responseMessage = null;

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {

        this.userId = +params['userId'];
        this.groupId = +params['groupId'];

        this.formButtonConfiguration.cancel.navigate = '../../view/' + params['userId'];
        this.formButtonConfiguration.cancel.isRelative = true;

        this.backendApiService.getUser(params['userId'])
        .then(user => {
          this.headerConfiguration.headerText = user.username;
        });

        this.backendApiService.getGroup(params['groupId'])
        .then(group => {
          this.groupName = group.name;
        });

      })
    );
  }


  submitForm() {

    this.backendApiService.deleteUserGroup(this.userId, this.groupId)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshUserGroupsObservable(this.userId);
        this.router.navigate(['../../../view/', this.userId], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
