import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UiAdminFormButtonConfiguration } from '../../../datatypes/ui-element-classes';


@Component({
  selector: 'dcf-ui-admin-form-buttons',
  templateUrl: './ui-admin-form-buttons.component.html',
  styleUrls: ['./ui-admin-form-buttons.component.css']
})
export class UiAdminFormButtonsComponent implements OnInit {

  @Input() formButtons: UiAdminFormButtonConfiguration;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  handleCancel() {
    if (this.formButtons.cancel.goBack) {
      this.location.back();
    } else {

      if ( this.formButtons.cancel.navigate && this.formButtons.cancel.isRelative ) {
        this.router.navigate([this.formButtons.cancel.navigate], { relativeTo: this.route });
      }

      if ( this.formButtons.cancel.navigate && !this.formButtons.cancel.isRelative ) {
        this.router.navigate([this.formButtons.cancel.navigate]);
      }

    }
  }


}
