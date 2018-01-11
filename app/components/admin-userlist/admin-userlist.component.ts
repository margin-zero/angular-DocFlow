import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs/Rx';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit, OnDestroy {

  users: User[];
  selectedUser: User = new User;

  private sub: any;

  componentHeader = 'Użytkownicy';

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService
  ) { }


  ngOnInit() {
    this.selectedUser = null;

    this.sub = this.backendApiService.getUsersObservable().subscribe(users => { this.users = users; });
    this.backendApiService.refreshUsersObservable();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  newUser(): User {
    return new User;
  }
}
