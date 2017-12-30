import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathlistComponent } from './admin-pathlist.component';

describe('AdminPathlistComponent', () => {
  let component: AdminPathlistComponent;
  let fixture: ComponentFixture<AdminPathlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPathlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPathlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
