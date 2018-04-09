import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectPathAllComponent } from './tool-select-path-all.component';

describe('ToolSelectPathAllComponent', () => {
  let component: ToolSelectPathAllComponent;
  let fixture: ComponentFixture<ToolSelectPathAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectPathAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectPathAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
