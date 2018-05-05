import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentEditComponent } from './user-document-edit.component';

describe('UserDocumentEditComponent', () => {
  let component: UserDocumentEditComponent;
  let fixture: ComponentFixture<UserDocumentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDocumentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
