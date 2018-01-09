import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';
import { FormModelEditUser } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ComponentCanDeactivate } from '../../services/router-guards/router-guards.service';

// import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService
  ) { }

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
        if (this.user.id === this.authenticationService.getUser().id) { this.loggedUser = true; } else { this.loggedUser = false; }
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
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

  handleCancel() {
    this.router.navigate(['../../view', this.id], { relativeTo: this.route });

  }
}
