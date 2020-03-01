import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersBlowupmasterComponent } from './charactersblowupmaster.component';

describe('CharactersBlowupmasterComponent', () => {
  let component: CharactersBlowupmasterComponent;
  let fixture: ComponentFixture<CharactersBlowupmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersBlowupmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersBlowupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
