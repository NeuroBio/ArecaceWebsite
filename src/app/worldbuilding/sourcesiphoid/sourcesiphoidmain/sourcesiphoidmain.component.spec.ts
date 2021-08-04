import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SourceSiphoidMainComponent } from './sourcesiphoidmain.component';

describe('SourceSiphoidMainComponent', () => {
  let component: SourceSiphoidMainComponent;
  let fixture: ComponentFixture<SourceSiphoidMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceSiphoidMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceSiphoidMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
