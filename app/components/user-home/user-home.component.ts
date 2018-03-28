import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { Document } from '../../datatypes/document';

@Component({
  selector: 'dcf-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class UserHomeComponent implements OnInit {

  documentsNotReady: Document[];
  documentsNotAssigned: Document[];
  documentsAssigned: Document[];

  documentsNotReadyCount = 0;
  documentsNotAssignedCount = 0;
  documentsAssignedCount = 0;

  documentToDisplay: Document;

  showDocumentHistory = false;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    /*
    this.subscriptionManager.add(
      this.backendApiService.getDocumentsNotReadyObservable().subscribe( documents => {
        this.documentsNotReady = documents;
      })
    );
    */

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsNotReadyCountObservable().subscribe( count => {
        this.documentsNotReadyCount = count;
      })
    );

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsNotAssignedCountObservable().subscribe( count => {
        this.documentsNotAssignedCount = count;
      })
    );

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsAssignedCountObservable().subscribe( count => {
        this.documentsAssignedCount = count;
      })
    );
  }

   onSelectDocumentNotReady(document: Document) {
      this.documentToDisplay = document;
      this.showDocumentHistory = false;
   }

   onSelectDocumentNotAssigned(document: Document) {
    this.documentToDisplay = document;
    this.showDocumentHistory = false;
   }

   onSelectDocumentAssigned(document: Document) {
    this.documentToDisplay = document;
    this.showDocumentHistory = false;
   }

   onDeleteSelectedDocument() {
     this.documentToDisplay = null;
   }

   onAcceptSelectedDocument() {
    this.documentToDisplay = null;
   }

   onAssignSelectedDocument() {
    this.documentToDisplay = null;
   }

   onReAssignSelectedDocument() {
    this.documentToDisplay = null;
   }

   toggleShowDocumentHistory() {
     this.showDocumentHistory = !this.showDocumentHistory;
   }
}
