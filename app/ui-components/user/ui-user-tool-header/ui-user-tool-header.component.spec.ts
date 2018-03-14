import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserToolHeaderComponent } from './ui-user-tool-header.component';

describe('UiUserToolHeaderComponent', () => {
  let component: UiUserToolHeaderComponent;
  let fixture: ComponentFixture<UiUserToolHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiUserToolHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiUserToolHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
