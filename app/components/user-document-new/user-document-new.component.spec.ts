import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentNewComponent } from './user-document-new.component';

describe('UserDocumentNewComponent', () => {
  let component: UserDocumentNewComponent;
  let fixture: ComponentFixture<UserDocumentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDocumentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDocumentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
