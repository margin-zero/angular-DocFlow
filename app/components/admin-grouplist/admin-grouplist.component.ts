import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '../../datatypes/role';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-grouplist',
  templateUrl: './admin-grouplist.component.html',
  styleUrls: ['./admin-grouplist.component.css']
})
export class AdminGrouplistComponent implements OnInit {

  roles: Role[];

  constructor(
    private router: Router,
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {
  }

}
