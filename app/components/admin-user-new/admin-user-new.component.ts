import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-user-new',
  templateUrl: './admin-user-new.component.html',
  styleUrls: ['./admin-user-new.component.css']
})
export class AdminUserNewComponent implements OnInit {

  user: User;
  users: User[];
  responseMessage = null;


  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User;
    this.user.id = 1;
    this.user.username = '';
    this.user.password = '';
    this.user.is_active = 'FALSE';
    this.user.is_admin = 'FALSE';
    this.user.is_user = 'FALSE';
    this.user.full_name = '';
    this.user.additional_info = '';
    this.user.email_address = '';
    this.user.phone_number = '';
    this.getUsers();
  }

  getUsers(): void {
    this.backendApiService
    .getUsers()
    .then(users => this.users = users);
  }

  isUsernameValid(): boolean {

    const username = this.user.username.trim();
    let returnValue = true;

    if ( username.length < 1 ) { returnValue = false; }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) { returnValue = false; }
    }

    return returnValue;
  }

  isPasswordValid(): boolean {
    return (this.user.password.length > 0);
  }

  isChanged(): boolean {
    return true;
  }

  handleClick() {
    if (this.isUsernameValid() && this.isPasswordValid()) {

      this.backendApiService.createUser(this.user)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.responseMessage = null;
          this.router.navigate(['/admin/user'], { relativeTo: this.currentRoute });
        } else {
          this.responseMessage = apiResponse.message;
        }
      });

    } else {
      if (!this.isUsernameValid()) {
        this.responseMessage = 'Nazwa użytkownika jest pusta lub użytkownik o takiej nazwie już istnieje. Podaj inną nazwę użytkownika.';
      } else {
        this.responseMessage = 'Hasło nie może być puste. Wprowadź hasło użytkownika.';
      }
      
    }
  }
}
