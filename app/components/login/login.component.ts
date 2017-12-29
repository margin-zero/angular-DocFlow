import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { User } from '../../datatypes/user';

@Component({
  selector: 'dcf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  user: User;

  constructor(
    private backendApiService: BackendApiService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(): void {

    this.username = this.username.trim();
    this.password = this.password.trim();

    if ( this.username.length === 0 || this.password.length === 0) { return; }

    this.backendApiService.login(this.username, this.password)
      .then(user => {
        this.user = user;
        this.authenticationService.setUser(user);
        this.router.navigate(['admin']);
      });

  }

}
