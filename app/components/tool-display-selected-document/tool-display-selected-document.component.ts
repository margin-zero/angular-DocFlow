import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { GlobalFunctionsService } from '../../services/global-functions/global-functions.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { PathStep } from '../../datatypes/pathstep';
import { Author } from '../../datatypes/author';
import { Path } from '../../datatypes/path';
import { Document } from '../../datatypes/document';
import { DocumentHistory } from '../../datatypes/documenthistory';

@Component({
  selector: 'dcf-tool-display-selected-document',
  templateUrl: './tool-display-selected-document.component.html',
  styleUrls: ['./tool-display-selected-document.component.css']
})
export class ToolDisplaySelectedDocumentComponent implements OnInit {

  @Output() onDeleteSelectedDocument = new EventEmitter();
  @Output() onAcceptSelectedDocument = new EventEmitter();
  @Output() onAssignSelectedDocument = new EventEmitter();
  @Output() onReAssignSelectedDocument = new EventEmitter();

  private _documentToDisplay: Document;

  @Input()
  set documentToDisplay(document: Document) {
    this._documentToDisplay = document;

    this.backendApiService.getAuthor(document.author_id)
    .then( author => this.author = author);

    this.backendApiService.getPath(document.path_id)
    .then( path => this.path = path);

    this.backendApiService.getPathStep(document.pathstep_id)
    .then( pathstep => this.pathstep = pathstep);

    this.backendApiService.getPathSteps(document.path_id)
    .then( pathsteps => this.pathsteps = pathsteps);
  }

  get documentToDisplay(): Document {
    return this._documentToDisplay;
  }

  author: Author = new Author();
  path: Path = new Path();
  pathstep: PathStep = new PathStep();
  pathsteps: PathStep[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private componentSubscriptionManager: ComponentSubscriptionManager,
    private globalFunctionsService: GlobalFunctionsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

  }

  deleteDocument() {
    const message = 'Wybierz OK aby potwierdzić usunięcie dokumentu lub ANULUJ aby zrezygnować z usunięcia.';
    if (window.confirm(message)) {
      this.backendApiService.deleteDocument(this.documentToDisplay.id)
      .then( () => {
        this.backendApiService.refreshDocumentsNotReadyObservable(this.documentToDisplay.assigned_user);
        this.onDeleteSelectedDocument.emit();
      });
    }
  }

  acceptDocument() {
    const message = 'Wybierz OK aby zatwierdzić dokument lub ANULUJ aby zrezygnować z zatwierdzenia.';
    if (window.confirm(message)) {
      this.backendApiService.makeDocumentReady(this.documentToDisplay.id)
      .then( () => {
        const documentHistoryEntry = new DocumentHistory();
        documentHistoryEntry.document_id = this.documentToDisplay.id;
        documentHistoryEntry.user_id = this.authenticationService.getUser().id;
        documentHistoryEntry.user_name = this.authenticationService.getUser().username;
        documentHistoryEntry.operation_date = this.globalFunctionsService.getCurrentDateStr();
        documentHistoryEntry.pathstep = this.pathstep.name;
        documentHistoryEntry.action = 'Zatwierdzenie dokumentu';

        this.backendApiService.createDocumentHistoryEntry(documentHistoryEntry)
        .then(() => {
          this.backendApiService.refreshDocumentsNotReadyObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsNotReadyCountObservable(this.authenticationService.getUser().id);
          this.onAcceptSelectedDocument.emit();
        });

      });
    }
  }


  assignDocument() {
    const message = 'Wybierz OK aby potwierdzić pobranie tego dokumentu do realizacji lub ANULUJ aby zrezygnować z rezerwacji dokumentu.';
    if (window.confirm(message)) {
       this.backendApiService.makeDocumentAssigned(this.documentToDisplay.id, this.authenticationService.getUser().id)
      .then( () => {
        const documentHistoryEntry = new DocumentHistory();
        documentHistoryEntry.document_id = this.documentToDisplay.id;
        documentHistoryEntry.user_id = this.authenticationService.getUser().id;
        documentHistoryEntry.user_name = this.authenticationService.getUser().username;
        documentHistoryEntry.operation_date = this.globalFunctionsService.getCurrentDateStr();
        documentHistoryEntry.pathstep = this.pathstep.name;
        documentHistoryEntry.action = 'Rezerwacja dokumentu';

        this.backendApiService.createDocumentHistoryEntry(documentHistoryEntry)
        .then(() => {
          this.backendApiService.refreshDocumentsNotAssignedObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsNotAssignedCountObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsAssignedObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsAssignedCountObservable(this.authenticationService.getUser().id);
          this.onAssignSelectedDocument.emit();
        });
      });
    }
  }


  reAssignDocument() {
    const message = 'Wybierz OK aby potwierdzić zwrot dokumentu lub ANULUJ aby zrezygnować ze zwrotu.';
    if (window.confirm(message)) {
       this.backendApiService.makeDocumentNotAssigned(this.documentToDisplay.id)
      .then( () => {
        const documentHistoryEntry = new DocumentHistory();
        documentHistoryEntry.document_id = this.documentToDisplay.id;
        documentHistoryEntry.user_id = this.authenticationService.getUser().id;
        documentHistoryEntry.user_name = this.authenticationService.getUser().username;
        documentHistoryEntry.operation_date = this.globalFunctionsService.getCurrentDateStr();
        documentHistoryEntry.pathstep = this.pathstep.name;
        documentHistoryEntry.action = 'Anulowanie rezerwacji dokumentu';

        this.backendApiService.createDocumentHistoryEntry(documentHistoryEntry)
        .then(() => {
          this.backendApiService.refreshDocumentsNotAssignedObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsNotAssignedCountObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsAssignedObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsAssignedCountObservable(this.authenticationService.getUser().id);
          this.onReAssignSelectedDocument.emit();
        });
      });
    }
  }

}
