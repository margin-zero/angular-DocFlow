import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from '../../datatypes/user';
import { Group } from '../../datatypes/group';
import { Path } from '../../datatypes/path';
import { EntryPathStepGroup } from '../../datatypes/entrypathstepgroup';

import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'dcf-tool-select-path',
  templateUrl: './tool-select-path.component.html',
  styleUrls: ['./tool-select-path.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class ToolSelectPathComponent implements OnInit {

  @Output() onSelectPath = new EventEmitter<Path>();

  page: number;
  totalPages: number;
  pageArray = [];

  user: User;
  groups: Group[] = [];  // grupy do których należy uzytkownik
  entryPathStepGroups: EntryPathStepGroup[] = [];  // wszystkie grupy, które są przypisane do akcji będących akcjami "wprowadzanie"
  paths: Path[] = [];  // ścieżki w systemie do których użytkownik może wystawiać nowe dokumenty

  pathsArray: Path[] = [];

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz ścieżkę obiegu dokumentu' } );

  filter: string;

  sortBy = 'name';
  sortDirection = 'asc';

  dataReadyToDisplay = false;


  constructor(
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    // private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {

    this.user = this.authenticationService.getUser();

    this.page = 1;
    this.totalPages = 0;
    this.filter = '';


    // ustalamy listę grup do których użytkownik jest przypisany
    this.backendApiService.getUserGroups(this.user.id)
      .then(groups  => {

        this.groups = groups;

      })
      .then( () => {

        // ustalamy wszystkie grupy które mają dostęp do jakiejkolwiek akcji "wprowadzanie" dla wszystkich ścieżek w systemie
          this.backendApiService.getEntryPathStepGroups()
            .then(entryPathStepGroups => {
                this.entryPathStepGroups = entryPathStepGroups;
            });

      })
      .then( () => {

          // ustalamy listę wszystkich ścieżek w systemie
          this.backendApiService.getPaths()
            .then( paths => {
                this.paths = this.getAllowedPaths(paths);
                this.preparePathsArray();
                this.dataReadyToDisplay = true;
            });

      });

  }

  // funkcja określa nam, czy bieżący użytkownik ma uprawnienia do wprowadzania dokumentu do danej ścieżki
  // sprawdzamy każdą grupę, która ma dostęp do jakiejkolwiek akcji "wprowadź"
  // jeśli dana grupa ma dostęp do akcji "wprowadź" sprawdzanej ścieżki
  // to sprawdzamy, czy ta grupa jest również na liście grup przypisanych do danego użytkownika
  // jeśli tak, to zwracamy TRUE
  canEnterNewDocument(pathId: number): boolean {
    for (let i = 0 ; i < this.entryPathStepGroups.length; i++) {
      if (this.entryPathStepGroups[i].path_id === pathId) {
        for (let j = 0; j < this.groups.length; j++) {
          if ( this.groups[j].id === this.entryPathStepGroups[i].group_id) { return true; }
        }
      }
    }
    return false;
  }


  // funkcja zwraca tablicę typu Path[], która zawiera tylko te ścieżki, do których użytkownik ma prawo wprowadzać dokumenty
  getAllowedPaths(paths: Path[]): Path[] {
    const pathArray: Path[] = [];
    for (let i = 0; i < paths.length; i++) {
      if (this.canEnterNewDocument(paths[i].id)) { pathArray.push(paths[i]); }
    }
    return pathArray;
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
