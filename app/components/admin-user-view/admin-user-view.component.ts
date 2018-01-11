import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'dcf-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
export class AdminUserViewComponent implements OnInit, OnDestroy {

  id: number;
  user: User;
  private sub: any;
  loggedUser: boolean;

  componentHeader: string;
  componentSubheader = 'dane użytkownika';

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.loggedUser = true;

    this.sub = this.currentRoute.params.subscribe(params => {
      this.id = +params['userId'];

      this.backendApiService.getUser(this.id)
        .then(user => {
        this.user = user;
        this.componentHeader = this.user.username;
        if (this.user.id === this.authenticationService.getUser().id) { this.loggedUser = true; } else { this.loggedUser = false; }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
