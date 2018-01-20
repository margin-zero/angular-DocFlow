import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionNewComponent } from './admin-action-new.component';

describe('AdminActionNewComponent', () => {
  let component: AdminActionNewComponent;
  let fixture: ComponentFixture<AdminActionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
