import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PixelformComponent } from './pixelform.component';

describe('PixelformComponent', () => {
  let component: PixelformComponent;
  let fixture: ComponentFixture<PixelformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
