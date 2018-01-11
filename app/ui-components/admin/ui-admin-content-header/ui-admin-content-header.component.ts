import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dcf-ui-admin-content-header',
  templateUrl: './ui-admin-content-header.component.html',
  styleUrls: ['./ui-admin-content-header.component.css']
})
export class UiAdminContentHeaderComponent implements OnInit {

  @Input() headerText: string;
  @Input() subheaderText: string;

  constructor() { }

  ngOnInit() {
  }



}
