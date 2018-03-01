import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathstepDeleteComponent } from './admin-pathstep-delete.component';

describe('AdminPathstepDeleteComponent', () => {
  let component: AdminPathstepDeleteComponent;
  let fixture: ComponentFixture<AdminPathstepDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathstepDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathstepDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
