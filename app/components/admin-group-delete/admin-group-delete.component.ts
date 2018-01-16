import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-group-delete',
  templateUrl: './admin-group-delete.component.html',
  styleUrls: ['./admin-group-delete.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminGroupDeleteComponent implements OnInit {

  id: number;
  returnPath: string;
  username: string;

  responseMessage: string;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({
    reset: {isVisible: false},
    cancel: { value: 'nie usuwaj', goBack: false},
    submit: { value: 'usuń', disabled: false}
  });

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'usuwanie grupy użytkowników'
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

        this.id = +params['groupId'];
        this.returnPath = '../../view/' + params['groupId'];
        this.formButtonConfiguration.cancel.navigate = this.returnPath;
        this.formButtonConfiguration.cancel.isRelative = true;

        this.backendApiService.getGroup(params['groupId'])
        .then(group => {
          this.headerConfiguration.headerText = group.name;
        });

      })
    );
  }


  submitForm() {

    this.backendApiService.deleteGroup(this.id)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshGroupsObservable();
        this.router.navigate(['../..'], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });
  }

}
