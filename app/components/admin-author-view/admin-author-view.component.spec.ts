import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorViewComponent } from './admin-author-view.component';

describe('AdminAuthorViewComponent', () => {
  let component: AdminAuthorViewComponent;
  let fixture: ComponentFixture<AdminAuthorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
