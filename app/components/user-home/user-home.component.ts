import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../datatypes/user';
import { Group } from '../../datatypes/group';
import { EntryPathStepGroup } from '../../datatypes/entrypathstepgroup';
import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
// import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class UserHomeComponent implements OnInit {

  user: User;
  groups: Group[] = [];
  entryPathStepGroups: EntryPathStepGroup[] = [];

  // headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'dane użytkownika'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.user = this.authenticationService.getUser();

    this.backendApiService.getUserGroups(this.user.id)
      .then(groups  => {
          this.groups = groups;
      });

    this.backendApiService.getEntryPathStepGroups()
      .then(entryPathStepGroups => {
          this.entryPathStepGroups = entryPathStepGroups;
      });

  }
}
