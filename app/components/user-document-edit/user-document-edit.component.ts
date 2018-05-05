import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Document } from '../../datatypes/document';
import { Path } from '../../datatypes/path';
import { PathStep } from '../../datatypes/pathstep';
import { Author } from '../../datatypes/author';
import { User } from '../../datatypes/user';

import { FormModelEditDocument } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { GlobalFunctionsService } from '../../services/global-functions/global-functions.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-user-document-edit',
  templateUrl: './user-document-edit.component.html',
  styleUrls: ['./user-document-edit.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class UserDocumentEditComponent implements OnInit {

  @ViewChild('f') form: any;

  formModel: FormModelEditDocument = new FormModelEditDocument();
  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  showToolSelectAuthor = false;
  selectedAuthor: Author = null;

  showToolSelectPath = false;
  selectedPath: Path = null;

  user: User;
  document: Document;
  pathsteps: PathStep[] = [];

  responseMessage: string;



  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionManager: ComponentSubscriptionManager,
    private authenticationService: AuthenticationService,
    private globalFunctionsService: GlobalFunctionsService
  ) { }

  ngOnInit() {

    this.subscriptionManager.add(
      this.form.statusChanges.subscribe(value => {
        this.formButtonConfiguration.submit.disabled = (value !== 'VALID') || !this.isChanged();
      })
    );


    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getDocument(+params['documentId'])
          .then(document => {
            this.formModel = document;
            this.document = Object.assign({}, document);

            this.backendApiService.getAuthor(document.author_id).then(author => this.selectedAuthor = author);
            this.backendApiService.getPath(document.path_id).then(path => this.selectedPath = path);
          });
        })
    );

    this.formModel.input_date = this.globalFunctionsService.getCurrentDateStr();

    this.formModel.assigned_user = this.authenticationService.getUser().id;

    this.responseMessage = '';

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
    const initialForm: FormModelEditDocument = this.document;
    return (JSON.stringify(this.formModel) !== JSON.stringify(initialForm) );
  }


  submitForm(isValid: boolean) {

    if (!isValid) { return; }


    this.backendApiService.updateDocument(this.formModel)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = this.document;
          this.responseMessage = null;
          this.router.navigate(['/user/home/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });

  }


  onSelectAuthor(author: Author) {
    this.selectedAuthor = author;
    this.showToolSelectAuthor = false;

    this.formModel.author_id = author.id;
  }

  toggleShowToolSelectAuthor() {
    this.showToolSelectAuthor = !this.showToolSelectAuthor;
  }

  onSelectPath(path: Path) {
    this.selectedPath = path;
    this.showToolSelectPath = false;
    this.formModel.path_id = path.id;

    this.backendApiService.getPathSteps(path.id)
    .then( pathsteps => {
      this.pathsteps = pathsteps;
      this.formModel.pathstep_id = this.getEntryPathStep(pathsteps).id;
    });
  }

  toggleShowToolSelectPath() {
    this.showToolSelectPath = !this.showToolSelectPath;
  }

  getEntryPathStep(pathsteps: PathStep[]): PathStep {
    for (let i = 0; i < pathsteps.length; i++) {
      if (pathsteps[i].action_enter === 'TRUE') { return pathsteps[i]; }
    }
    return null;
  }
}
