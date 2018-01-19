import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathNewComponent } from './admin-path-new.component';

describe('AdminPathNewComponent', () => {
  let component: AdminPathNewComponent;
  let fixture: ComponentFixture<AdminPathNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
