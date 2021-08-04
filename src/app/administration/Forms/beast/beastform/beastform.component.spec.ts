import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BeastFormComponent } from './beastform.component';

describe('BeastFormComponent', () => {
  let component: BeastFormComponent;
  let fixture: ComponentFixture<BeastFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BeastFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeastFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
