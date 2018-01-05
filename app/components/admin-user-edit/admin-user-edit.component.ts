import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { User } from '../../datatypes/user';

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
  oldUser: User;
  private sub: any;
  loggedUser: boolean;
  responseMessage: string;

  
  constructor(
    private route: ActivatedRoute,
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
        this.user = user;
        this.oldUser = Object.assign({}, user);
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
    return (JSON.stringify(this.user) !== JSON.stringify(this.oldUser) );
  }

  handleClick() {

    this.backendApiService.updateUser(this.user)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.oldUser = Object.assign({}, this.user);
        this.responseMessage = null;
        this.location.back();
      } else {
        this.responseMessage = apiResponse.message;
      }
    });

  }
}
