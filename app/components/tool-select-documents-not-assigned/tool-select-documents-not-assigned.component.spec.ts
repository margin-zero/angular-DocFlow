import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectDocumentsNotAssignedComponent } from './tool-select-documents-not-assigned.component';

describe('ToolSelectDocumentsNotAssignedComponent', () => {
  let component: ToolSelectDocumentsNotAssignedComponent;
  let fixture: ComponentFixture<ToolSelectDocumentsNotAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectDocumentsNotAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectDocumentsNotAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
