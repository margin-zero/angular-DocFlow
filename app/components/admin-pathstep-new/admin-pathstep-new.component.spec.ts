import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathstepNewComponent } from './admin-pathstep-new.component';

describe('AdminPathstepNewComponent', () => {
  let component: AdminPathstepNewComponent;
  let fixture: ComponentFixture<AdminPathstepNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathstepNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathstepNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
