import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { Document } from '../../datatypes/document';

@Component({
  selector: 'dcf-tool-select-documents-not-ready',
  templateUrl: './tool-select-documents-not-ready.component.html',
  styleUrls: ['./tool-select-documents-not-ready.component.css']
})
export class ToolSelectDocumentsNotReadyComponent implements OnInit {

  @Output() onSelectDocument = new EventEmitter<Document>();

  documentsNotReady: Document[];

  page: number;
  totalPages: number;

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz dokument' } );
  pageArray = [];

  documentsPerPage = 5;

  constructor(
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.page = 1;
    this.totalPages = 0;

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsNotReadyObservable().subscribe( documents => {
        this.documentsNotReady = documents;

        this.setTotalPages(documents.length);
        this.setPageArray();
      })
    );

    this.backendApiService.refreshDocumentsNotReadyObservable(this.authenticationService.getUser().id);
  }


  setTotalPages(elementCount: number) {
    this.totalPages = Math.floor(elementCount / this.documentsPerPage );
    if ((elementCount % this.documentsPerPage) > 0) { this.totalPages++ ; }
  }


  setPageArray() {
      this.pageArray = [];
      for (let i = 1; i <= this.totalPages; i++ ) {
        this.pageArray.push(i);
      }
  }


  setPage(pageNumber: number) {
    this.page = pageNumber;
  }


  selectDocument(document: Document) {
    this.onSelectDocument.emit(document);
  }

}
