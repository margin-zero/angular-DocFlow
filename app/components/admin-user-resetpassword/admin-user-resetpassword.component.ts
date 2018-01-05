import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';

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
  newPassword: string;
  retypedPassword: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {

    this.newPassword = '';
    this.retypedPassword = '';
    this.responseMessage = null;

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['userId'];
    });

    this.backendApiService.getUser(this.id)
      .then(user => {
        this.username = user.username;
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
    return (this.newPassword.length > 0 || this.retypedPassword.length > 0);
  }

  handleClick() {

    this.backendApiService.resetPassword(this.id, this.newPassword, this.retypedPassword)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.newPassword = '';
        this.retypedPassword = '';
        this.responseMessage = null;
        this.location.back();
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }


  handleCancel() {
    this.newPassword = '';
    this.retypedPassword = '';
    this.location.back();
  }
}
