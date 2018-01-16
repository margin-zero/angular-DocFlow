import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupDeleteComponent } from './admin-group-delete.component';

describe('AdminGroupDeleteComponent', () => {
  let component: AdminGroupDeleteComponent;
  let fixture: ComponentFixture<AdminGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
