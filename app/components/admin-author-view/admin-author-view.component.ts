import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Author } from '../../datatypes/author';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-author-view',
  templateUrl: './admin-author-view.component.html',
  styleUrls: ['./admin-author-view.component.css'],
  providers: [ ComponentSubscriptionManager ],
})
export class AdminAuthorViewComponent implements OnInit {

  author: Author;

  headerConfiguration = new UiAdminHeaderConfiguration({ subheaderText: 'dane wystawcy dokumentów'});

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {

    this.subscriptionManager.add(

      this.currentRoute.params.subscribe(params => {
        this.backendApiService.getAuthor(+params['authorId'])
          .then(author => {
            this.author = author;
            this.headerConfiguration.headerText = this.author.name;
        });
      })

    );


  }

  canBeDeleted(author: Author): boolean {
    /* --- TODO: dorobić sprawdzenie, czy dany autor może być usunięty - czyli, czy nie ma przypadkiem jakichś dokumentów wystawionych
    dla tego autora */
    return true;
  }
}
