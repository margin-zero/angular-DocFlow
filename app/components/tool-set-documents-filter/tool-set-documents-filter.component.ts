import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { GlobalFunctionsService } from '../../services/global-functions/global-functions.service';

import { Author } from '../../datatypes/author';
import { Path } from '../../datatypes/path';

import { FormModelDocumentSearch } from '../../datatypes/form-model-classes';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-tool-set-documents-filter',
  templateUrl: './tool-set-documents-filter.component.html',
  styleUrls: ['./tool-set-documents-filter.component.css']
})
export class ToolSetDocumentsFilterComponent implements OnInit {

  @ViewChild('f') form: any;

  @Input() documentsFilter: FormModelDocumentSearch;
  @Output() documentsFilterChange = new EventEmitter<FormModelDocumentSearch>();

  @Output() onFormCancel = new EventEmitter();
  @Output() onFormSubmit = new EventEmitter<FormModelDocumentSearch>();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  showToolSelectAuthor = false;
  selectedAuthor: Author = null;

  showToolSelectPath = false;
  selectedPath: Path = null;

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wprowadź kryteria wyszukiwania' } );

  constructor(
    private globalFunctions: GlobalFunctionsService,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID');
      })
    );

    this.subscriptionManager.add(
      this.form.valueChanges.subscribe( () => this.documentsFilterChange.emit(this.documentsFilter))
    );

    if (this.documentsFilter.author_id > 0) {
    this.backendApiService.getAuthor(this.documentsFilter.author_id)
      .then( author => this.selectedAuthor = author);
    }

    if (this.documentsFilter.path_id > 0) {
      this.backendApiService.getPath(this.documentsFilter.path_id)
        .then( path => this.selectedPath = path);
      }

  }

  initFormModelData() {
    // this.documentsFilter.input_date_end = this.globalFunctions.getCurrentDateStr();
    this.documentsFilter.date_by_author_end = this.globalFunctions.getCurrentDateStr();
  }

  toggleShowToolSelectAuthor() {
    this.showToolSelectAuthor = !this.showToolSelectAuthor;
  }

  onSelectAuthor(author: Author) {
    this.selectedAuthor = author;
    this.showToolSelectAuthor = false;

    this.documentsFilter.author_id = author.id;
  }


  toggleShowToolSelectPath() {
    this.showToolSelectPath = !this.showToolSelectPath;
  }

  onSelectPath(path: Path) {
    this.selectedPath = path;
    this.showToolSelectPath = false;

    this.documentsFilter.path_id = path.id;
  }


  clearSelectedPath() {
    this.selectedPath = null;
    this.documentsFilter.path_id = 0;
  }

  clearSelectedAuthor() {
    this.selectedAuthor = null;
    this.documentsFilter.author_id = 0;
  }


  onResetClick() {
    this.documentsFilter = new FormModelDocumentSearch();
    this.initFormModelData();
    this.clearSelectedAuthor();
    this.clearSelectedPath();
  }

  onCancelClick() {
    this.onFormCancel.emit();
  }

  onSubmitClick() {
    this.onFormSubmit.emit(this.documentsFilter);
  }


}
