import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserGroupsDeleteComponent } from './admin-user-groups-delete.component';

describe('AdminUserGroupsDeleteComponent', () => {
  let component: AdminUserGroupsDeleteComponent;
  let fixture: ComponentFixture<AdminUserGroupsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserGroupsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserGroupsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
