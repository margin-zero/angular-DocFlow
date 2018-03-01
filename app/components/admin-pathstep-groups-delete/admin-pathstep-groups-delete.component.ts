import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-pathstep-groups-delete',
  templateUrl: './admin-pathstep-groups-delete.component.html',
  styleUrls: ['./admin-pathstep-groups-delete.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminPathstepGroupsDeleteComponent implements OnInit {

  pathStepId: number;
  groupId: number;
  pathId: number;

  pathStepName: string;
  pathName: string;
  groupName: string;

  responseMessage: string;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({
    reset: {isVisible: false},
    cancel: { value: 'nie usuwaj', goBack: false},
    submit: { value: 'usuń', disabled: false}
  });

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'usuwanie dostępu do akcji ścieżki obiegu dokumentów'
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
        this.groupId = +params['groupId'];

        this.backendApiService.getGroup(this.groupId)
        .then(group => {
          this.groupName = group.name;
          this.headerConfiguration.headerText = this.groupName;
        });

        this.backendApiService.getPathStep(this.pathStepId)
        .then( pathstep => {
            this.pathId = pathstep.path_id;
            this.pathStepName = pathstep.name;

            this.formButtonConfiguration.cancel.navigate = '../../../../view/' + this.pathId;
            this.formButtonConfiguration.cancel.isRelative = true;
           } )
        .then( () => this.backendApiService.getPath(this.pathId).then( path => this.pathName = path.name ));


      })
    );
  }


  submitForm() {

    this.backendApiService.deletePathStepGroup(this.pathStepId, this.groupId)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshUsersObservable();
        this.router.navigate(['../../../../view', this.pathId], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });
  }

}
