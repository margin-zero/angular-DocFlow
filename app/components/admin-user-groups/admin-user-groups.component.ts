import { Component, OnInit, Input } from '@angular/core';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ComponentSubscriptionManager } from '../../common-classes/component-subscription-manager.class';

import { Group } from '../../datatypes/group';

@Component({
  selector: 'dcf-admin-user-groups',
  templateUrl: './admin-user-groups.component.html',
  styleUrls: ['./admin-user-groups.component.css'],
  providers: [ ComponentSubscriptionManager ]
})
export class AdminUserGroupsComponent implements OnInit {

  @Input() userId: number;

  groups: Group[];
  selectedOption: any = 0;

  constructor(
    private backendApiService: BackendApiService,
    private subscriptionManager: ComponentSubscriptionManager
  ) { }

  ngOnInit() {
    this.subscriptionManager.add(
      this.backendApiService.getNotUserGroupsObservable().subscribe( groups => {
        this.groups = groups;
        if (this.groups.length > 0) { this.selectedOption = this.groups[0].id; }
      })
    );

    this.backendApiService.refreshNotUserGroupsObservable(this.userId);
  }

}
