import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdminContentHeaderComponent } from './ui-admin-content-header.component';

describe('UiAdminContentHeaderComponent', () => {
  let component: UiAdminContentHeaderComponent;
  let fixture: ComponentFixture<UiAdminContentHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiAdminContentHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiAdminContentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
