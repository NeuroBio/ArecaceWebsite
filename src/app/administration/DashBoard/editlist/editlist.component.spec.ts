import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditListComponent } from './editlist.component';

describe('EditListComponent', () => {
  let component: EditListComponent;
  let fixture: ComponentFixture<EditListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
