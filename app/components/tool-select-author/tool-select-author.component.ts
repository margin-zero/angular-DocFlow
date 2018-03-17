import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Author } from '../../datatypes/author';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-tool-select-author',
  templateUrl: './tool-select-author.component.html',
  styleUrls: ['./tool-select-author.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class ToolSelectAuthorComponent implements OnInit {

  @Output() onSelectAuthor = new EventEmitter<Author>();

  page: number;
  totalPages: number;
  authors: Author[] = [];

  authorsArray: Author[] = [];

  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz wystawcę dokumentu' } );
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

    this.backendApiService.getAuthors()
      .then( authors => {
        this.authors = authors;
        this.prepareAuthorsArray();
      });

      this.filter = '';
  }


  prepareAuthorsArray() {
    // najpierw filtrujemy autorów zgodnie z aktuanym filtrem
    this.filterAuthors();
    // potem sortujemy odfiltrowaną tablicę
    this.sortAuthorsArray();
  }



  filterAuthors() {
    this.authorsArray = [];
    let valueToSearchIn = '';

    for (let i = 0; i < this.authors.length; i++) {

      valueToSearchIn = this.authors[i].id + ' ' + this.authors[i].name + ' ' + this.authors[i].full_name + ' ' + this.authors[i].address;

      if ((valueToSearchIn.toLowerCase().includes(this.filter.toLowerCase())) ||
          ( this.filter.trim().length === 0))  { this.authorsArray.push(this.authors[i]); }
    }

    this.setTotalPages(this.authorsArray.length);
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


  selectAuthor(author: Author) {
    this.onSelectAuthor.emit(author);
  }


// obsługa klikania w nagłówki tabeli - zmiana kolejności elementów

  clickIdHeader() {
    if (this.sortBy === 'id') {
      if (this.sortDirection === 'asc') {
          this.sortDirection = 'dsc';
      } else {
          this.sortDirection = 'asc';
      }
    } else {
      this.sortBy = 'id';
      this.sortDirection = 'asc';
    }

    this.sortAuthorsArray();
  }

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

    this.sortAuthorsArray();
  }


  clickFullNameHeader() {
    if (this.sortBy === 'full_name') {
      if (this.sortDirection === 'asc') {
          this.sortDirection = 'dsc';
      } else {
          this.sortDirection = 'asc';
      }
    } else {
      this.sortBy = 'full_name';
      this.sortDirection = 'asc';
    }

    this.sortAuthorsArray();
  }


  clickAddressHeader() {
    if (this.sortBy === 'address') {
      if (this.sortDirection === 'asc') {
          this.sortDirection = 'dsc';
      } else {
          this.sortDirection = 'asc';
      }
    } else {
      this.sortBy = 'address';
      this.sortDirection = 'asc';
    }

    this.sortAuthorsArray();
  }

  sortAuthorsArray() {
    if (this.sortBy === 'id' && this.sortDirection === 'asc') { this.authorsArray.sort(this.sortAuthorsArrayByIdAsc); }
    if (this.sortBy === 'id' && this.sortDirection === 'dsc') { this.authorsArray.sort(this.sortAuthorsArrayByIdDsc); }
    if (this.sortBy === 'name' && this.sortDirection === 'asc') { this.authorsArray.sort(this.sortAuthorsArrayByNameAsc); }
    if (this.sortBy === 'name' && this.sortDirection === 'dsc') { this.authorsArray.sort(this.sortAuthorsArrayByNameDsc); }
    if (this.sortBy === 'full_name' && this.sortDirection === 'asc') { this.authorsArray.sort(this.sortAuthorsArrayByFullNameAsc); }
    if (this.sortBy === 'full_name' && this.sortDirection === 'dsc') { this.authorsArray.sort(this.sortAuthorsArrayByFullNameDsc); }
    if (this.sortBy === 'address' && this.sortDirection === 'asc') { this.authorsArray.sort(this.sortAuthorsArrayByAddressAsc); }
    if (this.sortBy === 'address' && this.sortDirection === 'dsc') { this.authorsArray.sort(this.sortAuthorsArrayByAddressDsc); }
  }

  sortAuthorsArrayByIdAsc(a, b) {
      if (a.id < b.id) { return -1; }
      if (a.id > b.id) { return 1; }
      return 0;
    }

  sortAuthorsArrayByIdDsc(a, b) {
      if (a.id > b.id) { return -1; }
      if (a.id < b.id) { return 1; }
      return 0;
    }

  sortAuthorsArrayByNameAsc(a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }

  sortAuthorsArrayByNameDsc(a, b) {
      if (a.name > b.name) { return -1; }
      if (a.name < b.name) { return 1; }
      return 0;
    }

  sortAuthorsArrayByFullNameAsc(a, b) {
      if (a.full_name < b.full_name) { return -1; }
      if (a.full_name > b.full_name) { return 1; }
      return 0;
    }

  sortAuthorsArrayByFullNameDsc(a, b) {
      if (a.full_name > b.full_name) { return -1; }
      if (a.full_name < b.full_name) { return 1; }
      return 0;
    }

  sortAuthorsArrayByAddressAsc(a, b) {
      if (a.address < b.address) { return -1; }
      if (a.address > b.address) { return 1; }
      return 0;
    }

  sortAuthorsArrayByAddressDsc(a, b) {
      if (a.address > b.address) { return -1; }
      if (a.address < b.address) { return 1; }
      return 0;
    }

  }



