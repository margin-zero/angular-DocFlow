import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDisplaySelectedDocumentComponent } from './tool-display-selected-document.component';

describe('ToolDisplaySelectedDocumentComponent', () => {
  let component: ToolDisplaySelectedDocumentComponent;
  let fixture: ComponentFixture<ToolDisplaySelectedDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolDisplaySelectedDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDisplaySelectedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
