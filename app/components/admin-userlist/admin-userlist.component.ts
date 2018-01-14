import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { User } from '../../datatypes/user';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminUserlistComponent implements OnInit {

  users: User[];
  selectedUser: User = null;
  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Użytkownicy' } );

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getUsersObservable().subscribe(users => { this.users = users; })
    );

    this.backendApiService.refreshUsersObservable();
  }

}
