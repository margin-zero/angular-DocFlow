import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  users: User[];
  selectedUser: User;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.selectedUser = null;
  }

  getUsers(): void {
    this.backendApiService
    .getUsers()
    .then(users => this.users = users);
  }

  newUser(): User {
    return new User;

  }

}
