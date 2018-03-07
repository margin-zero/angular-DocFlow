import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Author } from '../../datatypes/author';
import { FormModelEditAuthor } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-author-new',
  templateUrl: './admin-author-new.component.html',
  styleUrls: ['./admin-author-new.component.css']
})
export class AdminAuthorNewComponent implements OnInit {

  @ViewChild('f') form: any;

  authors: Author[];
  responseMessage: string = null;

  formModel: FormModelEditAuthor = new FormModelEditAuthor();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    headerText: 'nowy-autor',
    subheaderText: 'wprowadzanie nowego wystawcy dokumentów'
    } );


  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }


  ngOnInit() {
    this.backendApiService
      .getAuthors()
      .then(authors => this.authors = authors);

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
    const emptyForm: FormModelEditAuthor = new FormModelEditAuthor();
    return (JSON.stringify(this.formModel) !== JSON.stringify(emptyForm) );
  }


  submitForm(formData: FormModelEditAuthor, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.createAuthor(formData)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = new FormModelEditAuthor();
          this.responseMessage = null;
          this.backendApiService.refreshAuthorsObservable();
          this.router.navigate(['/admin/author/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });
  }

}
