import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dcf-ui-admin-list-header',
  templateUrl: './ui-admin-list-header.component.html',
  styleUrls: ['./ui-admin-list-header.component.css']
})
export class UiAdminListHeaderComponent implements OnInit {

  @Input() headerText: string;

  constructor() { }

  ngOnInit() {
  }

}
