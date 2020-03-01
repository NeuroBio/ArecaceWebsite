import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersDetailsComponent } from './charactersdetails.component';

describe('CharactersDetailsComponent', () => {
  let component: CharactersDetailsComponent;
  let fixture: ComponentFixture<CharactersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
