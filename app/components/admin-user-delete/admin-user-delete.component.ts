import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-user-delete',
  templateUrl: './admin-user-delete.component.html',
  styleUrls: ['./admin-user-delete.component.css']
})
export class AdminUserDeleteComponent implements OnInit, OnDestroy {

  id: number;
  username: string;
  private sub: any;
  responseMessage: string;

  componentHeader: string;
  componentSubheader = 'usuwanie użytkownika';


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private backendApiService: BackendApiService,
    private router: Router
  ) { }


  ngOnInit() {

    this.responseMessage = null;

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['userId'];
    });

    this.backendApiService.getUser(this.id)
      .then(user => {
        this.username = user.username;
        this.componentHeader = user.username;
      });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  handleCancel() {
    this.router.navigate(['../../view', this.id], { relativeTo: this.route });
  }


  deleteUser() {

    this.backendApiService.deleteUser(this.id)
    .then(apiResponse => {
      if (apiResponse.status === 'OK') {
        this.responseMessage = null;
        this.backendApiService.refreshUsersObservable();
        this.router.navigate(['../..'], { relativeTo: this.route });
      } else {
        this.responseMessage = apiResponse.message;
      }
    });
  }

}
