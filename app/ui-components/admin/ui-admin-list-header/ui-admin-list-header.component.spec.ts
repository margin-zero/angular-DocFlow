import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdminListHeaderComponent } from './ui-admin-list-header.component';

describe('UiAdminListHeaderComponent', () => {
  let component: UiAdminListHeaderComponent;
  let fixture: ComponentFixture<UiAdminListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiAdminListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiAdminListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
