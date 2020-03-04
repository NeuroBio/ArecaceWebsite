import { Component, OnInit, OnDestroy }  from '@angular/core';
import { ActivatedRoute }     from '@angular/router';

import { GuildMetaData }      from 'src/app/Classes/ContentClasses';
import { GlobalVarsService }  from 'src/app/GlobalServices/global-vars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guilddetails',
  templateUrl: './guilddetails.component.html',
  styleUrls: ['./guilddetails.component.css']
})
export class GuildDetailsComponent implements OnInit, OnDestroy {

  guild: GuildMetaData;
  loading: boolean;
  stream1: Subscription;

  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Guild: GuildMetaData}) => {
      window.scroll(0,0);
      this.stream1 = this.global.ImagesLoadable.subscribe(load => this.loading = load);
      this.guild = data.Guild});
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }
}
