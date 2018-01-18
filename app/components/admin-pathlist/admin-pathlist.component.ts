import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Path } from '../../datatypes/path';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-admin-pathlist',
  templateUrl: './admin-pathlist.component.html',
  styleUrls: ['./admin-pathlist.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminPathlistComponent implements OnInit {

  paths: Path[] = [];
  selectedPath: Path = new Path();
  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Ścieżki' } );


  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.selectedPath = null;

    this.subscriptionManager.add(
      this.backendApiService.getPathsObservable().subscribe(paths => { this.paths = paths; })
    );
    this.backendApiService.refreshPathsObservable();
  }

}
