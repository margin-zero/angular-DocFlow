import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdminFormButtonsComponent } from './ui-admin-form-buttons.component';

describe('UiAdminFormButtonsComponent', () => {
  let component: UiAdminFormButtonsComponent;
  let fixture: ComponentFixture<UiAdminFormButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiAdminFormButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiAdminFormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
