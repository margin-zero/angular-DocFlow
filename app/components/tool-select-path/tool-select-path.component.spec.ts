import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectPathComponent } from './tool-select-path.component';

describe('ToolSelectPathComponent', () => {
  let component: ToolSelectPathComponent;
  let fixture: ComponentFixture<ToolSelectPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
