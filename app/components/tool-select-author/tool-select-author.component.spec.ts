import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSelectAuthorComponent } from './tool-select-author.component';

describe('ToolSelectAuthorComponent', () => {
  let component: ToolSelectAuthorComponent;
  let fixture: ComponentFixture<ToolSelectAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSelectAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
