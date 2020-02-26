import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildMetaData } from 'src/app/Classes/ContentClasses';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-guilddetails',
  templateUrl: './guilddetails.component.html',
  styleUrls: ['./guilddetails.component.css']
})
export class GuildDetailsComponent implements OnInit {

  guild: GuildMetaData;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Guild: GuildMetaData}) => {
      window.scroll(0,0);
      this.loading = this.global.ImagesLoadable;
      this.guild = data.Guild});
  }
}
