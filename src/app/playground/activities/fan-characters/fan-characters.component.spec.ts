import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FanCharactersComponent } from './fan-characters.component';

describe('FanCharactersComponent', () => {
  let component: FanCharactersComponent;
  let fixture: ComponentFixture<FanCharactersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FanCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
