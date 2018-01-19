import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathEditComponent } from './admin-path-edit.component';

describe('AdminPathEditComponent', () => {
  let component: AdminPathEditComponent;
  let fixture: ComponentFixture<AdminPathEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
