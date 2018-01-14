import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminUserViewComponent implements OnInit {

  user: User;
  headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'dane użytkownika'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(

      this.currentRoute.params.subscribe(params => {
        this.backendApiService.getUser(+params['userId'])
          .then(user => {
            this.user = user;
            this.headerConfiguration.headerText = this.user.username;
        });
      })

    );

  }


  onUserDataLoaded(user: User): void {
    this.user = user;
    this.headerConfiguration.headerText = this.user.username;
  }

}
