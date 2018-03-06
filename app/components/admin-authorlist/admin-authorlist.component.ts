import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Author } from '../../datatypes/author';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

@Component({
  selector: 'dcf-admin-authorlist',
  templateUrl: './admin-authorlist.component.html',
  styleUrls: ['./admin-authorlist.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminAuthorlistComponent implements OnInit {

  authors: Author[] = [];
  selectedUser: Author = null;
  headerConfiguration = new UiAdminHeaderConfiguration( { headerText: 'Wystawcy dokumentów' } );

  filter: string;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(
      this.backendApiService.getAuthorsObservable().subscribe(authors => { this.authors = authors; })
    );

    this.backendApiService.refreshAuthorsObservable();
    this.filter  = '';
  }

  filteredAuthors(): Author[] {
    const u = [];
    for (let i = 0; i < this.authors.length; i++) {
      if ((this.authors[i].name.toLowerCase().includes(this.filter.toLowerCase())) ||
          ( this.filter.trim().length === 0))  { u.push(this.authors[i]); }
    }
    return u;
  }

}
