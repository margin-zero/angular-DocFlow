import { Injectable, OnInit } from '@angular/core';
import { CanActivate, CanDeactivate }    from '@angular/router';

import {Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';

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

// ----------------------------------- IsAuthenticatedGuard --------------------------------------

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(): boolean {

    if (this.authenticationService.getUser()) {
      const isAuthenticated = this.authenticationService.isAuthenticated();
      const isActive = this.authenticationService.isActive();

      if (isActive && isAuthenticated) {
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


// ------------------------------ PendingChangesGuard ------------------------------------


export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate() ?
      true :
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      confirm('UWAGA: Nie zapisano wprowadzonych zmian. Wybierz ANULUJ aby powrócić i zapisać zmiany, lub OK aby zrezygnować z zapisu.');
  }
}


