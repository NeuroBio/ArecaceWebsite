import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersMainComponent } from './charactersmain.component';

describe('CharactersMainComponent', () => {
  let component: CharactersMainComponent;
  let fixture: ComponentFixture<CharactersMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
