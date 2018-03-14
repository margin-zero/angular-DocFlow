import { Component, OnInit, Input } from '@angular/core';
import { UiUserHeaderConfiguration } from '../../../datatypes/ui-element-classes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dcf-ui-user-tool-header',
  templateUrl: './ui-user-tool-header.component.html',
  styleUrls: ['./ui-user-tool-header.component.css']
})
export class UiUserToolHeaderComponent implements OnInit {

  @Input() headerConfiguration: UiUserHeaderConfiguration;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
