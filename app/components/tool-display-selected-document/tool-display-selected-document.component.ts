import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { PathStep } from '../../datatypes/pathstep';
import { Author } from '../../datatypes/author';
import { Path } from '../../datatypes/path';
import { Document } from '../../datatypes/document';

@Component({
  selector: 'dcf-tool-display-selected-document',
  templateUrl: './tool-display-selected-document.component.html',
  styleUrls: ['./tool-display-selected-document.component.css']
})
export class ToolDisplaySelectedDocumentComponent implements OnInit {

  @Output() onDeleteSelectedDocument = new EventEmitter();
  @Output() onAcceptSelectedDocument = new EventEmitter();

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
    private componentSubscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {

  }

  deleteDocument() {
    if (window.confirm('Wybierz OK aby potwierdzić usunięcie dokumentu lub ANULUJ aby zrezygnować z usunięcia.')) {
      this.backendApiService.deleteDocument(this.documentToDisplay.id)
      .then( () => {
        this.backendApiService.refreshDocumentsNotReadyObservable(this.documentToDisplay.assigned_user);
        this.onDeleteSelectedDocument.emit();
      });
    }
  }

  acceptDocument() {
    if (window.confirm('Wybierz OK aby zatwierdzić dokument lub ANULUJ aby zrezygnować z zatwierdzenia.')) {
      this.backendApiService.makeDocumentReady(this.documentToDisplay.id)
      .then( () => {
        this.backendApiService.refreshDocumentsNotReadyObservable(this.documentToDisplay.assigned_user);
        this.onAcceptSelectedDocument.emit();
      });
    }
  }
}
