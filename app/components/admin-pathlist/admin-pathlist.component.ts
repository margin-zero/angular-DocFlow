import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Path } from '../../datatypes/path';

import { BackendApiService } from '../../services/backend-api/backend-api.service';

@Component({
  selector: 'dcf-admin-pathlist',
  templateUrl: './admin-pathlist.component.html',
  styleUrls: ['./admin-pathlist.component.css']
})
export class AdminPathlistComponent implements OnInit {

  roles: Path[];

  constructor(
    private router: Router,
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {
  }

}
