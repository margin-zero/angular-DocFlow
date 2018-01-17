import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../datatypes/group';
import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-group-view',
  templateUrl: './admin-group-view.component.html',
  styleUrls: ['./admin-group-view.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminGroupViewComponent implements OnInit {

  group: Group;
  users: User[] = [];

  headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'użytkownicy w grupie'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getGroupUsersObservable().subscribe( users => {
        this.users = users;
      })
    );

    this.subscriptionManager.add(

      this.currentRoute.params.subscribe(params => {
        this.backendApiService.getGroup(+params['groupId'])
          .then(group => {
            this.group = group;
            this.headerConfiguration.headerText = this.group.name;

            this.backendApiService.refreshGroupUsersObservable(group.id);
            this.backendApiService.refreshNotGroupUsersObservable(group.id);
        });
      })

    );

  }
}
