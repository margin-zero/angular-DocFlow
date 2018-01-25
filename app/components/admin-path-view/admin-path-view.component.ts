import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Path } from '../../datatypes/path';
import { PathStep } from '../../datatypes/pathstep';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-path-view',
  templateUrl: './admin-path-view.component.html',
  styleUrls: ['./admin-path-view.component.css'],
})
export class AdminPathViewComponent implements OnInit {

  path: Path = new Path();
  pathSteps: PathStep[] = [];

  headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'ścieżka obiegu dokumentów'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getPathStepsObservable().subscribe( pathSteps => {
        this.pathSteps = pathSteps;
      })
    );


    this.subscriptionManager.add(

      this.currentRoute.params.subscribe(params => {
        this.backendApiService.getPath(+params['pathId'])
          .then(path => {
            this.path = path;
            this.headerConfiguration.headerText = this.path.name;
            this.backendApiService.refreshPathStepsObservable(path.id);
        });
      })

    );

  }


}
