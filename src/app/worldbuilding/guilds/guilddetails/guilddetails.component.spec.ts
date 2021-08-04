import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuildDetailsComponent } from './guilddetails.component';

describe('GuildDetailsComponent', () => {
  let component: GuildDetailsComponent;
  let fixture: ComponentFixture<GuildDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
