import { Injectable, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User } from '../../datatypes/user';



@Injectable()
export class AuthenticationService implements OnInit {

  private authenticated: boolean;
  private user: User;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticated = false;
    this.user = null;
  }

  setUser(user: User): void {

    this.user = user;

    if (user) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  getUser(): User {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isUser(): boolean {
    return ( this.user.is_user.toLowerCase().trim() === 'true' );
  }

  isAdmin(): boolean {
    return ( this.user.is_admin.toLowerCase().trim() === 'true' );
  }

  isActive(): boolean {
    return ( this.user.is_active.toLowerCase().trim() === 'true' );
  }

  logout(): void {
    this.user = null;
    this.authenticated = false;
    this.router.navigate(['/']);
  }

}
