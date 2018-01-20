import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Action } from '../../datatypes/action';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-action-view',
  templateUrl: './admin-action-view.component.html',
  styleUrls: ['./admin-action-view.component.css']
})
export class AdminActionViewComponent implements OnInit {

  action: Action;

  headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'akcja'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(

      this.currentRoute.params.subscribe(params => {
        this.backendApiService.getAction(+params['actionId'])
          .then(action => {
            this.action = action;
            this.headerConfiguration.headerText = this.action.name;
        });
      })

    );

  }
}
