import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { GlobalFunctionsService } from '../../services/global-functions/global-functions.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { Document } from '../../datatypes/document';
import { Author } from '../../datatypes/author';
import { Path } from '../../datatypes/path';

import { FormModelDocumentSearch } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-tool-select-documents-closed',
  templateUrl: './tool-select-documents-closed.component.html',
  styleUrls: ['./tool-select-documents-closed.component.css']
})
export class ToolSelectDocumentsClosedComponent implements OnInit {

  @Input() documentsPerPage: number;
  @Output() onSelectDocument = new EventEmitter<Document>();

  documentsFound: Document[];
  formModel: FormModelDocumentSearch = new FormModelDocumentSearch();

  page: number;
  totalPages: number;

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz dokument' } );
  pageArray = [];

  showToolSelectAuthor = false;
  selectedAuthor: Author = null;

  showToolSelectPath = false;
  selectedPath: Path = null;


  constructor(
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager,
    private globalFunctions: GlobalFunctionsService
  ) { }

  ngOnInit() {
    this.page = 1;
    this.totalPages = 0;
    this.formModel.input_date_end = this.globalFunctions.getCurrentDateStr();
    this.formModel.date_by_author_end = this.globalFunctions.getCurrentDateStr();

    this.subscriptionManager.add(
      this.backendApiService.getDocumentsAssignedObservable().subscribe( documents => {
        this.documentsFound = documents;

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

  toggleShowToolSelectAuthor() {
    this.showToolSelectAuthor = !this.showToolSelectAuthor;
  }

  onSelectAuthor(author: Author) {
    this.selectedAuthor = author;
    this.showToolSelectAuthor = false;

    this.formModel.author_id = author.id;
  }


  toggleShowToolSelectPath() {
    this.showToolSelectPath = !this.showToolSelectPath;
  }

  onSelectPath(path: Path) {
    this.selectedPath = path;
    this.showToolSelectPath = false;

    this.formModel.path_id = path.id;
  }


  clearSelectedPath() {
    this.selectedPath = null;
    this.formModel.path_id = 0;
  }

  clearSelectedAuthor() {
    this.selectedAuthor = null;
    this.formModel.author_id = 0;
  }



}
