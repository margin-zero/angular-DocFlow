import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupUsersComponent } from './admin-group-users.component';

describe('AdminGroupUsersComponent', () => {
  let component: AdminGroupUsersComponent;
  let fixture: ComponentFixture<AdminGroupUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
