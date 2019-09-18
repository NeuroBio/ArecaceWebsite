import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDutiesComponent } from './adminDuties.component';

describe('AdminDutiesComponent', () => {
  let component: AdminDutiesComponent;
  let fixture: ComponentFixture<AdminDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
