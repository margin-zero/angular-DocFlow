import { Injectable, OnInit } from '@angular/core';
import { CanActivate }    from '@angular/router';
import {Router} from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';


// ----------------------------------- IsAdminGuard --------------------------------------

@Injectable()
export class IsAdminGuard implements CanActivate {


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(): boolean {

    if (this.authenticationService.getUser()) {
      const isAuthenticated = this.authenticationService.isAuthenticated();
      const isAdmin = this.authenticationService.isAdmin();
      const isActive = this.authenticationService.isActive();

      if (isAdmin && isActive && isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/user']);
        return false;
      }
    } else {
      this.router.navigate(['/user']);
      return false;
    }
  }
}


// ----------------------------------- IsUserGuard --------------------------------------

@Injectable()
export class IsUserGuard implements CanActivate {


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(): boolean {

    if (this.authenticationService.getUser()) {
      const isAuthenticated = this.authenticationService.isAuthenticated();
      const isUser = this.authenticationService.isUser();
      const isActive = this.authenticationService.isActive();

      if (isUser && isActive && isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

