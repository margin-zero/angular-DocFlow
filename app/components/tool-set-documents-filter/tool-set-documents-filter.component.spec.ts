import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSetDocumentsFilterComponent } from './tool-set-documents-filter.component';

describe('ToolSetDocumentsFilterComponent', () => {
  let component: ToolSetDocumentsFilterComponent;
  let fixture: ComponentFixture<ToolSetDocumentsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSetDocumentsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSetDocumentsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
