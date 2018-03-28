import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { Document } from '../../datatypes/document';

@Component({
  selector: 'dcf-tool-select-documents-assigned',
  templateUrl: './tool-select-documents-assigned.component.html',
  styleUrls: ['./tool-select-documents-assigned.component.css']
})
export class ToolSelectDocumentsAssignedComponent implements OnInit {

  @Input() documentsPerPage: number;
  @Output() onSelectDocument = new EventEmitter<Document>();

  documentsAssigned: Document[];

  page: number;
  totalPages: number;

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz dokument' } );
  pageArray = [];

  constructor(
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.page = 1;
    this.totalPages = 0;

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsAssignedObservable().subscribe( documents => {
        this.documentsAssigned = documents;

        this.setTotalPages(documents.length);
        this.setPageArray();
      })
    );

    this.backendApiService.refreshDocumentsAssignedObservable(this.authenticationService.getUser().id);

    this.backendApiService.refreshDocumentsAssignedCountObservable(this.authenticationService.getUser().id);
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
