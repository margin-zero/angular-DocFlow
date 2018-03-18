import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectDocumentsNotReadyComponent } from './tool-select-documents-not-ready.component';

describe('ToolSelectDocumentsNotReadyComponent', () => {
  let component: ToolSelectDocumentsNotReadyComponent;
  let fixture: ComponentFixture<ToolSelectDocumentsNotReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectDocumentsNotReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectDocumentsNotReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
