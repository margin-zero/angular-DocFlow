import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { FormModelEditUser } from '../../datatypes/form-model-classes';

@Component({
  selector: 'dcf-admin-user-new',
  templateUrl: './admin-user-new.component.html',
  styleUrls: ['./admin-user-new.component.css']
})
export class AdminUserNewComponent implements OnInit {

  user: User;
  users: User[];
  responseMessage = null;
  formModel: FormModelEditUser;

  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.formModel = new FormModelEditUser;
    this.formModel.id = 1;
    this.formModel.username = '';
    this.formModel.password = '';
    this.formModel.is_active = 'FALSE';
    this.formModel.is_admin = 'FALSE';
    this.formModel.is_user = 'FALSE';
    this.formModel.full_name = '';
    this.formModel.additional_info = '';
    this.formModel.email_address = '';
    this.formModel.phone_number = '';
    this.getUsers();
  }

  getUsers(): void {
    this.backendApiService
    .getUsers()
    .then(users => this.users = users);
  }

  isUsernameValid(username: string): boolean {

    username = username.trim();
    let returnValue = true;

    if ( username.length < 1 ) { returnValue = false; }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) { returnValue = false; }
    }

    return returnValue;
  }



  isChanged(): boolean {
    return true;
  }

  /*
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
*/


  newUser(model: FormModelEditUser, isValid: boolean) {

    if (!isValid) { return; }
    if (!this.isUsernameValid(model.username)) { return; }

    this.backendApiService.createUser(model)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.responseMessage = null;
          this.router.navigate(['/admin/user/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });

  }

  handleCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });

  }
}
