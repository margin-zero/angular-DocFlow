import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Action } from '../../datatypes/action';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-admin-actionlist',
  templateUrl: './admin-actionlist.component.html',
  styleUrls: ['./admin-actionlist.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminActionlistComponent implements OnInit {

  actions: Action[] = [];
  selectedAction: Action = new Action();
  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Akcje' } );


  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.selectedAction = null;

    this.subscriptionManager.add(
      this.backendApiService.getActionsObservable().subscribe(actions => { this.actions = actions; })
    );
    this.backendApiService.refreshActionsObservable();
  }

}
