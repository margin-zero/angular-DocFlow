import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { Group } from '../../datatypes/group';
import { FormModelEditGroup } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';
import { UiAdminFormButtonConfiguration, UiAdminHeaderConfiguration } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-group-new',
  templateUrl: './admin-group-new.component.html',
  styleUrls: ['./admin-group-new.component.css']
})
export class AdminGroupNewComponent implements OnInit {

  @ViewChild('f') form: any;

  groups: Group[];
  responseMessage: string = null;

  formModel: FormModelEditGroup = new FormModelEditGroup();

  formButtonConfiguration: UiAdminFormButtonConfiguration = new UiAdminFormButtonConfiguration({});

  headerConfiguration: UiAdminHeaderConfiguration = new UiAdminHeaderConfiguration( {
    headerText: 'nowa-grupa',
    subheaderText: 'wprowadzanie nowej grupy'
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
      .getGroups()
      .then(groups => this.groups = groups);

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
    const emptyForm: FormModelEditGroup = new FormModelEditGroup();
    return (JSON.stringify(this.formModel) !== JSON.stringify(emptyForm) );
    // return true;
  }


  submitForm(formData: FormModelEditGroup, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.createGroup(formData)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = new FormModelEditGroup();
          this.responseMessage = null;
          this.backendApiService.refreshGroupsObservable();
          this.router.navigate(['/admin/group/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });
  }

}
