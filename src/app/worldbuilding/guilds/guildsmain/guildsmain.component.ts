import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute }             from '@angular/router';

import { Observable }                 from 'rxjs';
import { map }                        from 'rxjs/operators';

import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-guildsmain',
  templateUrl: './guildsmain.component.html'
})

export class GuildsMainComponent implements OnInit {

  current: string;
  guilds$: Observable<string[][][]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.guilds$ = this.generalcollectserv.returnMetaData().pipe(
      map(Guilds => {
        Guilds.sort((a,b) => a.Founded < b.Founded ? -1 : 1);
        return Guilds.map(Guild => [Guild.ID, Guild.ID]);
      }) );
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('GuildID') );
  }
}
