import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { GlobalFunctionsService } from '../../services/global-functions/global-functions.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { PathStep } from '../../datatypes/pathstep';
import { Author } from '../../datatypes/author';
import { Path } from '../../datatypes/path';
import { Document } from '../../datatypes/document';
import { DocumentHistory } from '../../datatypes/documenthistory';
import { FormModelPathStepAction } from '../../datatypes/form-model-classes';

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
  @Output() onDoPathStepAction = new EventEmitter();

  private _documentToDisplay: Document;

  @Input()
  set documentToDisplay(document: Document) {
    this._documentToDisplay = document;

    this.backendApiService.getAuthor(document.author_id)
    .then( author => this.author = author);

    this.backendApiService.getPath(document.path_id)
    .then( path => this.path = path);

    this.backendApiService.getPathStep(document.pathstep_id)
    .then( pathstep => {
      this.pathstep = pathstep;
      if (pathstep.action_change === 'TRUE') { this.formModel.actionId = 4; }
      if (pathstep.action_cancel === 'TRUE') { this.formModel.actionId = 3; }
      if (pathstep.action_archive === 'TRUE') { this.formModel.actionId = 2; }
      if (pathstep.action_next === 'TRUE') { this.formModel.actionId = 1; }

      this.formModel.message = this.documentToDisplay.message;
    });

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
  pathsToSend: Path[] = [];


  formModel: FormModelPathStepAction = new FormModelPathStepAction();

  constructor(
    private backendApiService: BackendApiService,
    private componentSubscriptionManager: ComponentSubscriptionManager,
    private globalFunctionsService: GlobalFunctionsService,
    private authenticationService: AuthenticationService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.backendApiService.getPathsToSend(this.documentToDisplay.path_id)
    .then(pathsToSend => this.pathsToSend = pathsToSend);
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

      this.backendApiService.makeDocumentReady(this.documentToDisplay)
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
          this.backendApiService.refreshDocumentsNotAssignedObservable(this.authenticationService.getUser().id);
          this.backendApiService.refreshDocumentsNotAssignedCountObservable(this.authenticationService.getUser().id);

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


  doPathStepAction() {
    const message = 'Wybierz OK aby potwierdzić wykonanie akcji lub ANULUJ aby zrezygnować.';
    if (window.confirm(message)) {

      if (1 * this.formModel.actionId === 1) {
        this.backendApiService.doDocumentActionNext(this.documentToDisplay, this.formModel)
        .then( () => this.createDocumentHistoryEntry('Wykonaj i przekaż dalej') );
      }

      if (1 * this.formModel.actionId === 2) {
        this.backendApiService.doDocumentActionArchive(this.documentToDisplay, this.formModel)
        .then( () => this.createDocumentHistoryEntry('Wykonaj i archiwizuj') );
      }

      if (1 * this.formModel.actionId === 3) {
        this.backendApiService.doDocumentActionCancel(this.documentToDisplay, this.formModel)
        .then( () => this.createDocumentHistoryEntry('Odrzuć') );
      }

      if (1 * this.formModel.actionId === 4) {
        this.backendApiService.doDocumentActionChange(this.documentToDisplay, this.formModel)
        .then( () => this.createDocumentHistoryEntry('Przekaż do innej ścieżki') );
      }

      this.onDoPathStepAction.emit();
   }
 }


 createDocumentHistoryEntry(action: string) {

    const documentHistoryEntry = new DocumentHistory();

    documentHistoryEntry.document_id = this.documentToDisplay.id;
    documentHistoryEntry.user_id = this.authenticationService.getUser().id;
    documentHistoryEntry.user_name = this.authenticationService.getUser().username;
    documentHistoryEntry.operation_date = this.globalFunctionsService.getCurrentDateStr();
    documentHistoryEntry.pathstep = this.pathstep.name;
    documentHistoryEntry.action = action;

    this.backendApiService.createDocumentHistoryEntry(documentHistoryEntry)
    .then(() => {
      this.backendApiService.refreshDocumentsNotAssignedObservable(this.authenticationService.getUser().id);
      this.backendApiService.refreshDocumentsNotAssignedCountObservable(this.authenticationService.getUser().id);
      this.backendApiService.refreshDocumentsAssignedObservable(this.authenticationService.getUser().id);
      this.backendApiService.refreshDocumentsAssignedCountObservable(this.authenticationService.getUser().id);
    });
 }


  submitForm(formData: FormModelPathStepAction, isValid: boolean) {
    if (isValid) { this.doPathStepAction(); }
  }

}
