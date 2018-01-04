import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'dcf-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit, OnDestroy {

  id: number;
  user: User;
  oldUser: User;
  private sub: any;
  loggedUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.loggedUser = false;

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

  isChanged(): boolean {
    return (JSON.stringify(this.user) !== JSON.stringify(this.oldUser) );
  }

  handleClick() {

    this.backendApiService.updateUser(this.user)
    .then(apiResponse => this.location.back());

  }
}
