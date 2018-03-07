import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorNewComponent } from './admin-author-new.component';

describe('AdminAuthorNewComponent', () => {
  let component: AdminAuthorNewComponent;
  let fixture: ComponentFixture<AdminAuthorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
