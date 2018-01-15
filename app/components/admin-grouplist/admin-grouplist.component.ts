import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Group } from '../../datatypes/group';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-admin-grouplist',
  templateUrl: './admin-grouplist.component.html',
  styleUrls: ['./admin-grouplist.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminGrouplistComponent implements OnInit {

  groups: Group[];
  selectedUser: Group = null;
  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Grupy' } );

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getGroupsObservable().subscribe(groups => { this.groups = groups; })
    );

    this.backendApiService.refreshGroupsObservable();
  }

}
