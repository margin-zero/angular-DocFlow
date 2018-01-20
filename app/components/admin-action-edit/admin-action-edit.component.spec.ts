import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionEditComponent } from './admin-action-edit.component';

describe('AdminActionEditComponent', () => {
  let component: AdminActionEditComponent;
  let fixture: ComponentFixture<AdminActionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
