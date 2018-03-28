import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectDocumentsAssignedComponent } from './tool-select-documents-assigned.component';

describe('ToolSelectDocumentsAssignedComponent', () => {
  let component: ToolSelectDocumentsAssignedComponent;
  let fixture: ComponentFixture<ToolSelectDocumentsAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectDocumentsAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectDocumentsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
