import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupViewComponent } from './admin-group-view.component';

describe('AdminGroupViewComponent', () => {
  let component: AdminGroupViewComponent;
  let fixture: ComponentFixture<AdminGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
