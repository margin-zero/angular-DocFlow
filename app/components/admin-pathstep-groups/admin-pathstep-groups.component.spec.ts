import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathstepGroupsComponent } from './admin-pathstep-groups.component';

describe('AdminPathstepGroupsComponent', () => {
  let component: AdminPathstepGroupsComponent;
  let fixture: ComponentFixture<AdminPathstepGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathstepGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathstepGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
