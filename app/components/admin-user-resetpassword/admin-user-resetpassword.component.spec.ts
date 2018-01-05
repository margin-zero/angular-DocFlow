import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserResetpasswordComponent } from './admin-user-resetpassword.component';

describe('AdminUserResetpasswordComponent', () => {
  let component: AdminUserResetpasswordComponent;
  let fixture: ComponentFixture<AdminUserResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
