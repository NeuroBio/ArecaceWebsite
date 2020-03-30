import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelSoldierComponent } from './pixel-soldier.component';

describe('PixelSoldierComponent', () => {
  let component: PixelSoldierComponent;
  let fixture: ComponentFixture<PixelSoldierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelSoldierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelSoldierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
