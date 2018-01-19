import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathViewComponent } from './admin-path-view.component';

describe('AdminPathViewComponent', () => {
  let component: AdminPathViewComponent;
  let fixture: ComponentFixture<AdminPathViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
