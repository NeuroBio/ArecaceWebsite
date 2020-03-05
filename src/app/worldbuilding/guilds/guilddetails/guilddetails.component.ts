import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { GuildMetaData }            from 'src/app/Classes/ContentClasses';
import { GlobalVarsService }        from 'src/app/GlobalServices/global-vars.service';
import { GetRouteSegmentsService }  from 'src/app/GlobalServices/commonfunctions.service';

@Component({
  selector: 'app-guilddetails',
  templateUrl: './guilddetails.component.html',
  styleUrls: ['./guilddetails.component.css']
})
export class GuildDetailsComponent implements OnInit {

  guild: GuildMetaData;
  loading: boolean;
  name: string;
  path: string;

  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService,
              private getsegserv: GetRouteSegmentsService) { }

  ngOnInit() {
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.route.data.subscribe((data: {Guild: GuildMetaData}) => {
      window.scroll(0,0);
      this.loading = this.global.ImagesLoadable.value;
      this.guild = data.Guild;
      this.name = this.guild.GuildName;
      this.path = `/${mainPath}/${this.guild.ID}`;

    });
  }
}
