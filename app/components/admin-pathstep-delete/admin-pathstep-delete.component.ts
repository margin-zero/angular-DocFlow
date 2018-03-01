import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-pathstep-delete',
  templateUrl: './admin-pathstep-delete.component.html',
  styleUrls: ['./admin-pathstep-delete.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminPathstepDeleteComponent implements OnInit {

  pathStepId: number;
  pathId: number;

  pathStepName: string;
  pathName: string;

  responseMessage: string;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({
    reset: {isVisible: false},
    cancel: { value: 'nie usuwaj', goBack: false},
    submit: { value: 'usuń', disabled: false}
  });

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'usuwanie akcji ścieżki obiegu dokumentów'
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

        this.pathStepId = +params['pathStepId'];

        this.backendApiService.getPathStep(this.pathStepId)
        .then(pathstep => {
          this.pathId = pathstep.path_id;
          this.pathStepName = pathstep.name;
        })
        .then( () => this.backendApiService.getPath(this.pathId)
                    .then(path => this.pathName = path.name )
        )
        .then( () => {
          this.formButtonConfiguration.cancel.navigate = '../../../view/' + this.pathId;
          this.formButtonConfiguration.cancel.isRelative = true;

          this.headerConfiguration.headerText = this.pathStepName;
        });
      })
    );
  }


  submitForm() {

    this.backendApiService.deletePathStep(this.pathStepId)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshUsersObservable();
        this.router.navigate(['../../../view', this.pathId], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });
  }

}
