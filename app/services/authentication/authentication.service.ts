import { Injectable, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { User } from '../../datatypes/user';



@Injectable()
export class AuthenticationService implements OnInit {

  private authenticated: boolean;
  private user: User;

  constructor() { }

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
    return this.user.is_user;
  }

  isAdmin(): boolean {
    return this.user.is_admin;
  }

  isActive(): boolean {
    return this.user.is_active;
  }

}
