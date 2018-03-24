import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDisplaySelectedDocumentHistoryComponent } from './tool-display-selected-document-history.component';

describe('ToolDisplaySelectedDocumentHistoryComponent', () => {
  let component: ToolDisplaySelectedDocumentHistoryComponent;
  let fixture: ComponentFixture<ToolDisplaySelectedDocumentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolDisplaySelectedDocumentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDisplaySelectedDocumentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
