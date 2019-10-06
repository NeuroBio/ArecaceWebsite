import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelArmyComponent } from './pixel-army.component';

describe('PixelArmyComponent', () => {
  let component: PixelArmyComponent;
  let fixture: ComponentFixture<PixelArmyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelArmyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
