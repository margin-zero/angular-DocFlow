import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../../datatypes/document';
import { DocumentHistory } from '../../datatypes/documenthistory';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-tool-display-selected-document-history',
  templateUrl: './tool-display-selected-document-history.component.html',
  styleUrls: ['./tool-display-selected-document-history.component.css']
})
export class ToolDisplaySelectedDocumentHistoryComponent implements OnInit {

  private _documentToDisplay: Document;

  @Input()
  set documentToDisplay(document: Document) {
    this._documentToDisplay = document;

    this.backendApiService.getDocumentHistory(document.id)
    .then( documentHistory => this.documentHistory = documentHistory );

/*    this.backendApiService.getAuthor(document.author_id)
    .then( author => this.author = author);

    this.backendApiService.getPath(document.path_id)
    .then( path => this.path = path);

    this.backendApiService.getPathStep(document.pathstep_id)
    .then( pathstep => this.pathstep = pathstep);

    this.backendApiService.getPathSteps(document.path_id)
    .then( pathsteps => this.pathsteps = pathsteps);
*/
  }

  get documentToDisplay(): Document {
    return this._documentToDisplay;
  }

  documentHistory: DocumentHistory[] = [];

  constructor(
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {
  }

}
