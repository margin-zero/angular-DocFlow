import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private backendApiService: BackendApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
