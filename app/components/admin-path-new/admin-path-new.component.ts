import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Path } from '../../datatypes/path';
import { FormPathEditGroup } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-admin-path-new',
  templateUrl: './admin-path-new.component.html',
  styleUrls: ['./admin-path-new.component.css']
})
export class AdminPathNewComponent implements OnInit {

  @ViewChild('f') form: any;

  paths: Path[];
  responseMessage: string = null;

  formModel: FormPathEditGroup = new FormPathEditGroup();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    headerText: 'nowa-ścieżka',
    subheaderText: 'wprowadzanie nowej ścieżki obiegu dokumentów'
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
      .getPaths()
      .then(paths => this.paths = paths);

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
    const emptyForm: FormPathEditGroup = new FormPathEditGroup();
    return (JSON.stringify(this.formModel) !== JSON.stringify(emptyForm) );
  }


  submitForm(formData: FormPathEditGroup, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.createPath(formData)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = new FormPathEditGroup();
          this.responseMessage = null;
          this.backendApiService.refreshPathsObservable();
          this.router.navigate(['/admin/path/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });
  }

}
