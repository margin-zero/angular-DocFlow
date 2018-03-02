import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-path-delete',
  templateUrl: './admin-path-delete.component.html',
  styleUrls: ['./admin-path-delete.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminPathDeleteComponent implements OnInit {

  pathId: number;
  pathName: string;

  responseMessage: string;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({
    reset: {isVisible: false},
    cancel: { value: 'nie usuwaj', goBack: false},
    submit: { value: 'usuń', disabled: false}
  });

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'usuwanie ścieżki obiegu dokumentów'
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

        this.pathId = +params['pathId'];

        this.backendApiService.getPath(this.pathId)
        .then(path => {
          this.pathId = path.id;
          this.pathName = path.name;
        })
        .then( () => {
          this.formButtonConfiguration.cancel.navigate = '../../view/' + this.pathId;
          this.formButtonConfiguration.cancel.isRelative = true;

          this.headerConfiguration.headerText = this.pathName;
        });
      })
    );
  }


  submitForm() {

    this.backendApiService.deletePath(this.pathId)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshPathsObservable();
        this.router.navigate(['../..'], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });
  }

}
