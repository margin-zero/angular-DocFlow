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
  selector: 'dcf-admin-path-edit',
  templateUrl: './admin-path-edit.component.html',
  styleUrls: ['./admin-path-edit.component.css']
})
export class AdminPathEditComponent implements OnInit {

  @ViewChild('f') form: any;

  path: Path = new Path();
  responseMessage: string;

  formModel: FormPathEditGroup = new FormPathEditGroup();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});
  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    subheaderText: 'edycja ścieżki'
    } );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) {}


  ngOnInit() {

    this.responseMessage = null;

    this.subscriptionManager.add(
      this.route.params.subscribe(params => {
        this.backendApiService.getPath(+params['pathId'])
          .then(path => {

            this.headerConfiguration.headerText = path.name;
            this.formModel = path;
            this.path = Object.assign({}, path);

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
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.path) );
  }


  submitForm(formData: FormPathEditGroup, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.updatePath(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {

        this.path = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.backendApiService.refreshPathsObservable();
        this.router.navigate(['../../view', this.path.id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }

}
