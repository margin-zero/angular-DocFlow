import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Document } from '../../datatypes/document';
import { Path } from '../../datatypes/path';

import { FormModelEditDocument } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
// import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-user-document-new',
  templateUrl: './user-document-new.component.html',
  styleUrls: ['./user-document-new.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class UserDocumentNewComponent implements OnInit {

  pathId: number;
  authorId: number;

  path: Path;

  formModel: FormModelEditDocument = new FormModelEditDocument();


  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getPath(+params['pathId'])
          .then(path => {
            this.path = path;
          });
        this.pathId = +params['pathId'];
        this.authorId = +params['authorId'];
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
    const emptyForm: FormModelEditDocument = new FormModelEditDocument();
    return (JSON.stringify(this.formModel) !== JSON.stringify(emptyForm) );
  }


  submitForm(formData: FormModelEditDocument, isValid: boolean) {

    if (!isValid) { return; }
/*
    this.backendApiService.createUser(formData)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = new FormModelEditUser();
          this.responseMessage = null;
          this.backendApiService.refreshUsersObservable();
          this.router.navigate(['/admin/user/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });
    */
  }

}
