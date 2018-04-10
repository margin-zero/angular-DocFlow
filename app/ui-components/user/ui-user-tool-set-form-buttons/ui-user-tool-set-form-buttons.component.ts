import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UiAdminFormButtonConfiguration } from '../../../datatypes/ui-element-classes';



@Component({
  selector: 'dcf-ui-user-tool-set-form-buttons',
  templateUrl: './ui-user-tool-set-form-buttons.component.html',
  styleUrls: ['./ui-user-tool-set-form-buttons.component.css']
})
export class UiUserToolSetFormButtonsComponent implements OnInit {

  @Output() onReset = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  @Input() formButtons: UiAdminFormButtonConfiguration;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  handleCancel() {
    this.onCancel.emit();
  }

  handleReset() {
    this.onReset.emit();
  }

  handleSubmit() {
    this.onSubmit.emit();
  }


}
