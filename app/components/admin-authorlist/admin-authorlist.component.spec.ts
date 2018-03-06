import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorlistComponent } from './admin-authorlist.component';

describe('AdminAuthorlistComponent', () => {
  let component: AdminAuthorlistComponent;
  let fixture: ComponentFixture<AdminAuthorlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
