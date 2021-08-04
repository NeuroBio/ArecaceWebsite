import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SourceAffinityComponent } from './source-affinity.component';

describe('SourceAffinityComponent', () => {
  let component: SourceAffinityComponent;
  let fixture: ComponentFixture<SourceAffinityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceAffinityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceAffinityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
