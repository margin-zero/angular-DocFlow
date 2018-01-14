import { Component, OnInit, Input } from '@angular/core';
import { UiAdminHeaderConfiguration } from '../../../datatypes/ui-element-classes';

@Component({
  selector: 'dcf-ui-admin-content-header',
  templateUrl: './ui-admin-content-header.component.html',
  styleUrls: ['./ui-admin-content-header.component.css']
})
export class UiAdminContentHeaderComponent implements OnInit {

  @Input() headerConfiguration: UiAdminHeaderConfiguration;

  constructor() { }

  ngOnInit() {}

}
