import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Author } from '../../datatypes/author';
import { FormModelEditAuthor } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-author-edit',
  templateUrl: './admin-author-edit.component.html',
  styleUrls: ['./admin-author-edit.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminAuthorEditComponent implements OnInit {

  @ViewChild('f') form: any;

  author: Author = new Author();
  responseMessage: string;

  formModel: FormModelEditAuthor = new FormModelEditAuthor();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});
  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'edycja danych wystawcy dokumentów'
    } );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private subscriptionManager: ComponentSubscriptionManager
  ) {}


  ngOnInit() {

    this.responseMessage = null;

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getAuthor(+params['authorId'])
          .then(author => {

            this.headerConfiguration.headerText = author.name;
            this.formModel = author;
            this.author = Object.assign({}, author);

          });
        })
    );

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID') || !this.isChanged();
      })
    );

  }


  // @HostListener detects navigating out of your current location via router but also
  //               by closing browser's window, typing in new url etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // return true - change location without user confirmation
    // return false - shows "OK/Cancel" dialog before navigation
    return !this.isChanged();
  }


  isChanged(): boolean {
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.author) );
  }


  submitForm(formData: FormModelEditAuthor, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.updateAuthor(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {

        this.author = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.backendApiService.refreshAuthorsObservable();
        this.router.navigate(['../../view', this.author.id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
