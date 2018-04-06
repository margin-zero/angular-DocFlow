import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectDocumentsClosedComponent } from './tool-select-documents-closed.component';

describe('ToolSelectDocumentsClosedComponent', () => {
  let component: ToolSelectDocumentsClosedComponent;
  let fixture: ComponentFixture<ToolSelectDocumentsClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectDocumentsClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectDocumentsClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
