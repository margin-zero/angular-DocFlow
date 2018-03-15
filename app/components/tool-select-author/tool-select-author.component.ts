import { Component, OnInit } from '@angular/core';

import { Author } from '../../datatypes/author';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-tool-select-author',
  templateUrl: './tool-select-author.component.html',
  styleUrls: ['./tool-select-author.component.css'],
  // providers: [ ComponentSubscriptionManager ]
})
export class ToolSelectAuthorComponent implements OnInit {

  page: number;
  totalPages: number;
  authors: Author[] = [];
  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wybierz wystawcę dokumentu' } );
  pageArray = [];

  filter: string;

  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.page = 1;
    this.totalPages = 0;

    this.subscriptionManager.add(
      this.backendApiService.getAuthorsObservable().subscribe(authors => this.authors = authors)
    );

    this.backendApiService.refreshAuthorsObservable();


    this.filter = '';

  }

  filteredAuthors(): Author[] {
    const fa = [];
    let valueToSearchIn = '';

    for (let i = 0; i < this.authors.length; i++) {

      valueToSearchIn = this.authors[i].id + ' ' + this.authors[i].name + ' ' + this.authors[i].full_name + ' ' + this.authors[i].address;

      if ((valueToSearchIn.toLowerCase().includes(this.filter.toLowerCase())) ||
          ( this.filter.trim().length === 0))  { fa.push(this.authors[i]); }
    }

    this.setTotalPages(fa.length);
    this.setPageArray();

    return fa;
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
}
