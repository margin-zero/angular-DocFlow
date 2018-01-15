import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupNewComponent } from './admin-group-new.component';

describe('AdminGroupNewComponent', () => {
  let component: AdminGroupNewComponent;
  let fixture: ComponentFixture<AdminGroupNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
