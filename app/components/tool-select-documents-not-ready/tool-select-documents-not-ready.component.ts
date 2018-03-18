import { Component, OnInit } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { Document } from '../../datatypes/document';

@Component({
  selector: 'dcf-tool-select-documents-not-ready',
  templateUrl: './tool-select-documents-not-ready.component.html',
  styleUrls: ['./tool-select-documents-not-ready.component.css']
})
export class ToolSelectDocumentsNotReadyComponent implements OnInit {

  documentsNotReady: Document[];

  page = 1;

  constructor(
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsNotReadyObservable().subscribe( documents => {
        this.documentsNotReady = documents;
      })
    );

    this.backendApiService.refreshDocumentsNotReadyObservable(this.authenticationService.getUser().id);
  }

}
