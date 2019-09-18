import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFormComponent } from './master-form.component';

describe('MasterFormComponent', () => {
  let component: MasterFormComponent;
  let fixture: ComponentFixture<MasterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
