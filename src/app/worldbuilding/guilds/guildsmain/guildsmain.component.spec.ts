import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuildsMainComponent } from './guildsmain.component';

describe('GuildsMainComponent', () => {
  let component: GuildsMainComponent;
  let fixture: ComponentFixture<GuildsMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
