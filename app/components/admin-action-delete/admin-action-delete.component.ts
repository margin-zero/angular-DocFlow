import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-action-delete',
  templateUrl: './admin-action-delete.component.html',
  styleUrls: ['./admin-action-delete.component.css']
})
export class AdminActionDeleteComponent implements OnInit {

  id: number;
  returnPath: string;

  responseMessage: string;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({
    reset: {isVisible: false},
    cancel: { value: 'nie usuwaj', goBack: false},
    submit: { value: 'usuń', disabled: false}
  });

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'usuwanie akcji'
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

        this.id = +params['actionId'];
        this.returnPath = '../../view/' + params['actionId'];
        this.formButtonConfiguration.cancel.navigate = this.returnPath;
        this.formButtonConfiguration.cancel.isRelative = true;

        this.backendApiService.getAction(params['actionId'])
        .then(action => {
          this.headerConfiguration.headerText = action.name;
        });

      })
    );
  }


  submitForm() {

    this.backendApiService.deleteAction(this.id)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshActionsObservable();
        this.router.navigate(['../..'], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });
  }

}
