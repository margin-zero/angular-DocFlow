import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionDeleteComponent } from './admin-action-delete.component';

describe('AdminActionDeleteComponent', () => {
  let component: AdminActionDeleteComponent;
  let fixture: ComponentFixture<AdminActionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
