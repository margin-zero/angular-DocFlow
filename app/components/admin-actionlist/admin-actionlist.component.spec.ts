import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionlistComponent } from './admin-actionlist.component';

describe('AdminActionlistComponent', () => {
  let component: AdminActionlistComponent;
  let fixture: ComponentFixture<AdminActionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
