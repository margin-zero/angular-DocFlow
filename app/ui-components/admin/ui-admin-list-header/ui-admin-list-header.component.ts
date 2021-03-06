import { Component, OnInit, Input } from '@angular/core';
import { UiAdminHeaderConfiguration } from '../../../datatypes/ui-element-classes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dcf-ui-admin-list-header',
  templateUrl: './ui-admin-list-header.component.html',
  styleUrls: ['./ui-admin-list-header.component.css']
})
export class UiAdminListHeaderComponent implements OnInit {

  @Input() headerConfiguration: UiAdminHeaderConfiguration;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
