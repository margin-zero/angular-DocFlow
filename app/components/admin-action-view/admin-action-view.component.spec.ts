import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionViewComponent } from './admin-action-view.component';

describe('AdminActionViewComponent', () => {
  let component: AdminActionViewComponent;
  let fixture: ComponentFixture<AdminActionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
