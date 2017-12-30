import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrouplistComponent } from './admin-grouplist.component';

describe('AdminGrouplistComponent', () => {
  let component: AdminGrouplistComponent;
  let fixture: ComponentFixture<AdminGrouplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGrouplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
