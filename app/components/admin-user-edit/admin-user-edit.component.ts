import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';
import { FormModelEditUser } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ComponentCanDeactivate } from '../../services/router-guards/router-guards.service';


// UI Form Buttons Component
import { UiAdminFormButtonConfiguration, UiAdminFormButtonConfigurationFactory } from '../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  id: number;
  user: User;
  private sub: any;
  loggedUser: boolean;
  responseMessage: string;

  formModel: FormModelEditUser;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  componentHeader: string;
  componentSubheader = 'edycja konta';

  formButtonConfiguration: UiAdminFormButtonConfiguration = UiAdminFormButtonConfigurationFactory();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

    this.loggedUser = false;
    this.responseMessage = null;

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['userId'];
    });

    this.backendApiService.getUser(this.id)
      .then(user => {
        this.formModel = user;
        this.user = Object.assign({}, user);
        this.componentHeader = this.user.username;
        if (this.user.id === this.authenticationService.getUser().id) { this.loggedUser = true; } else { this.loggedUser = false; }
      });

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // @HostListener Pozwala na wykrycie opuszczenia danej lokalizacji nie tylko w efekcie zmiany nawigacji ale
  //               również poprzez zamknięcie okna, wpisanie innego adresu itp.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // return true - pozwala nawigować bez potwierdzenia
    // return false - pokazuje dialog potwierdzenia przez nawigacją
    return !this.isChanged();
  }


  isChanged(): boolean {
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.user) );
  }


  editUser(formData: FormModelEditUser, isValid: boolean) {

    if (!isValid) { return; }

    if (!formData.is_user) { this.formModel.is_user = 'FALSE'; }

    this.backendApiService.updateUser(this.formModel)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.user = Object.assign({}, this.formModel);
        this.responseMessage = null;
        this.router.navigate(['../../view', this.id], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }


  // ta funkcja służy wyłącznie do tego, żeby w czasie rzeczywistym pobrać stan walidacji formularza,
  // i przekazać go do komponentu wyświetlającego buttony pod formularzem
  formValidationToController(formIsValid: boolean): boolean {
    this.formButtonConfiguration.submit.disabled = !formIsValid || !this.isChanged();
    return (true);
  }
}
