import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../datatypes/user';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
export class AdminUserViewComponent implements OnInit, OnDestroy {

  id: number;
  user: User;
  private sub: any;

  constructor(
    private currentRoute: ActivatedRoute,
    private backendApiService: BackendApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.currentRoute.params.subscribe(params => {
      this.id = +params['userId'];
      this.backendApiService.getUser(this.id)
        .then(user => { this.user = user; });
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
