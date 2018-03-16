import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Path } from '../../datatypes/path';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-tool-select-path',
  templateUrl: './tool-select-path.component.html',
  styleUrls: ['./tool-select-path.component.css']
})
export class ToolSelectPathComponent implements OnInit {

  @Output() onSelectPath = new EventEmitter<Path>();

  page: number;
  totalPages: number;
  paths: Path[] = [];

  pathsArray: Path[] = [];

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz ścieżkę obiegu dokumentu' } );
  pageArray = [];

  filter: string;

  sortBy = 'name';
  sortDirection = 'asc';


  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.page = 1;
    this.totalPages = 0;

    this.backendApiService.getPaths()
      .then( paths => {
        this.paths = paths;
        this.preparePathsArray();
      });

      this.filter = '';
  }


  preparePathsArray() {
    // najpierw filtrujemy ścieżki zgodnie z aktuanym filtrem
    this.filterPaths();
    // potem sortujemy odfiltrowaną tablicę
    this.sortPathsArray();
  }



  filterPaths() {
    this.pathsArray = [];
    let valueToSearchIn = '';

    for (let i = 0; i < this.paths.length; i++) {

      valueToSearchIn = this.paths[i].id + ' ' + this.paths[i].name + ' ' + this.paths[i].info;

      if ((valueToSearchIn.toLowerCase().includes(this.filter.toLowerCase())) ||
          ( this.filter.trim().length === 0))  { this.pathsArray.push(this.paths[i]); }
    }

    this.setTotalPages(this.pathsArray.length);
    this.setPageArray();
    this.page = 1;
  }


  setTotalPages(elementCount: number) {
    this.totalPages = Math.floor(elementCount / 10 );
    if ((elementCount % 10) > 0) { this.totalPages++ ; }
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


  selectPath(path: Path) {
    this.onSelectPath.emit(path);
  }


// obsługa klikania w nagłówki tabeli - zmiana kolejności elementów

  clickNameHeader() {
    if (this.sortBy === 'name') {
      if (this.sortDirection === 'asc') {
          this.sortDirection = 'dsc';
      } else {
          this.sortDirection = 'asc';
      }
    } else {
      this.sortBy = 'name';
      this.sortDirection = 'asc';
    }

    this.sortPathsArray();
  }


  clickInfoHeader() {
    if (this.sortBy === 'info') {
      if (this.sortDirection === 'asc') {
          this.sortDirection = 'dsc';
      } else {
          this.sortDirection = 'asc';
      }
    } else {
      this.sortBy = 'info';
      this.sortDirection = 'asc';
    }

    this.sortPathsArray();
  }


  sortPathsArray() {
    if (this.sortBy === 'name' && this.sortDirection === 'asc') { this.pathsArray.sort(this.sortPathsArrayByNameAsc); }
    if (this.sortBy === 'name' && this.sortDirection === 'dsc') { this.pathsArray.sort(this.sortPathsArrayByNameDsc); }
    if (this.sortBy === 'info' && this.sortDirection === 'asc') { this.pathsArray.sort(this.sortPathsArrayByInfoAsc); }
    if (this.sortBy === 'info' && this.sortDirection === 'dsc') { this.pathsArray.sort(this.sortPathsArrayByInfoDsc); }
  }

  sortPathsArrayByNameAsc(a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }
  sortPathsArrayByNameDsc(a, b) {
      if (a.name > b.name) { return -1; }
      if (a.name < b.name) { return 1; }
      return 0;
    }

  sortPathsArrayByInfoAsc(a, b) {
      if (a.info < b.info) { return -1; }
      if (a.info > b.info) { return 1; }
      return 0;
    }

  sortPathsArrayByInfoDsc(a, b) {
      if (a.info > b.info) { return -1; }
      if (a.info < b.info) { return 1; }
      return 0;
    }

  }
