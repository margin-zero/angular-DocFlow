import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserToolSetFormButtonsComponent } from './ui-user-tool-set-form-buttons.component';

describe('UiUserToolSetFormButtonsComponent', () => {
  let component: UiUserToolSetFormButtonsComponent;
  let fixture: ComponentFixture<UiUserToolSetFormButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiUserToolSetFormButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiUserToolSetFormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
