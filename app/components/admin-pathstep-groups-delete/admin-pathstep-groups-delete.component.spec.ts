import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathstepGroupsDeleteComponent } from './admin-pathstep-groups-delete.component';

describe('AdminPathstepGroupsDeleteComponent', () => {
  let component: AdminPathstepGroupsDeleteComponent;
  let fixture: ComponentFixture<AdminPathstepGroupsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathstepGroupsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathstepGroupsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
