import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathstepEditComponent } from './admin-pathstep-edit.component';

describe('AdminPathstepEditComponent', () => {
  let component: AdminPathstepEditComponent;
  let fixture: ComponentFixture<AdminPathstepEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathstepEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathstepEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
