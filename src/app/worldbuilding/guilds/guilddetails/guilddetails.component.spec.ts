import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildDetailsComponent } from './guilddetails.component';

describe('GuildDetailsComponent', () => {
  let component: GuildDetailsComponent;
  let fixture: ComponentFixture<GuildDetailsComponent>;

  beforeEach(async(() => {
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
