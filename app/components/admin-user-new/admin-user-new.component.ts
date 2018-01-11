import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

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
  formModelOld: FormModelEditUser;

  componentHeader = 'nowy-użytkownik';
  componentSubheader = 'wprowadzanie nowego użytkownika';

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

    this.formModelOld = Object.assign({}, this.formModel);
  }


  getUsers(): void {
    this.backendApiService
    .getUsers()
    .then(users => this.users = users);
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return !this.isChanged();
  }


  isChanged(): boolean {
    return (JSON.stringify(this.formModel) !== JSON.stringify(this.formModelOld) );
  }



  newUser(model: FormModelEditUser, isValid: boolean) {
    if (!isValid) { return; }

    this.backendApiService.createUser(model)
      .then(apiResponse => {
        if (apiResponse.status === 'OK') {
          this.formModel = null;
          this.formModelOld = null;
          this.responseMessage = null;
          this.backendApiService.refreshUsersObservable();
          this.router.navigate(['/admin/user/']);
        } else {
          this.responseMessage = apiResponse.message;
        }
      });
  }


  handleCancel() {
    this.location.back();
  }



}
