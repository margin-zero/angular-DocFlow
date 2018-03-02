import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathDeleteComponent } from './admin-path-delete.component';

describe('AdminPathDeleteComponent', () => {
  let component: AdminPathDeleteComponent;
  let fixture: ComponentFixture<AdminPathDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
