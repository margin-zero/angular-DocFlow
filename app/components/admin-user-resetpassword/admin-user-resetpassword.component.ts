import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';
import { FormModelResetPassword } from '../../datatypes/form-model-classes';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentCanDeactivate } from '../../services/router-guards/router-guards.service';


@Component({
  selector: 'dcf-admin-user-resetpassword',
  templateUrl: './admin-user-resetpassword.component.html',
  styleUrls: ['./admin-user-resetpassword.component.css']
})
export class AdminUserResetpasswordComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  id: number;
  username: string;
  private sub: any;
  responseMessage: string;

  formModel: FormModelResetPassword;

  componentHeader: string;
  componentSubheader = 'resetowanie hasła';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService,
    private router: Router
  ) { }

  ngOnInit() {

    this.responseMessage = null;

    this.formModel = {
      password: '',
      confirmPassword: ''
    };


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['userId'];
    });

    this.backendApiService.getUser(this.id)
      .then(user => {
        this.username = user.username;
        this.componentHeader = user.username;
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
    if ((this.formModel.password && this.formModel.password.length > 0) ||
        (this.formModel.confirmPassword && this.formModel.confirmPassword.length > 0)) {
          return true;
        } else {
          return false;
    }

  }

  resetPassword(formData: FormModelResetPassword, isValid: boolean) {

    if (!isValid) { return; }

    this.backendApiService.resetPassword(this.id, formData.password)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        alert('Hasło użytkownika zostało zmienione.');
        this.responseMessage = null;
        this.formModel.password = '';
        this.formModel.confirmPassword = '';
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
