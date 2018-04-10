import { Component, OnInit, ViewChild } from '@angular/core';

import { GlobalFunctionsService } from '../../services/global-functions/global-functions.service';

import { Author } from '../../datatypes/author';
import { Path } from '../../datatypes/path';

import { FormModelDocumentSearch } from '../../datatypes/form-model-classes';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-tool-set-documents-filter',
  templateUrl: './tool-set-documents-filter.component.html',
  styleUrls: ['./tool-set-documents-filter.component.css']
})
export class ToolSetDocumentsFilterComponent implements OnInit {

  @ViewChild('f') form: any;

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  formModel: FormModelDocumentSearch = new FormModelDocumentSearch();

  showToolSelectAuthor = false;
  selectedAuthor: Author = null;

  showToolSelectPath = false;
  selectedPath: Path = null;

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wprowadź kryteria wyszukiwania' } );

  constructor(
    private globalFunctions: GlobalFunctionsService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {

    this.initFormModelData();

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID');
      })
    );
  }

  initFormModelData() {
    this.formModel.input_date_end = this.globalFunctions.getCurrentDateStr();
    this.formModel.date_by_author_end = this.globalFunctions.getCurrentDateStr();
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


  onResetClick() {
    this.formModel = new FormModelDocumentSearch();
    this.initFormModelData();
    this.clearSelectedAuthor();
    this.clearSelectedPath();
  }

  onCancelClick() {
    alert('kliknąłeś CANCEL');
  }

  onSubmitClick() {
    alert('kliknąłeś SUBMIT');
  }


}
