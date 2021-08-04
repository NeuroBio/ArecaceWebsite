import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { GuildMetaData } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-guildsmain',
  templateUrl: './guildsmain.component.html'
})

export class GuildsMainComponent implements OnInit {

  current: string;
  guilds$: Observable<LinkList>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.guilds$ = this.generalcollectserv.returnMetaData().pipe(
      map((Guilds: GuildMetaData[]) => {
        Guilds.sort((a, b) => a.Founded < b.Founded ? -1 : 1);
        return new LinkList('Organization',
          Guilds.map(Guild => new LinkListElement(Guild.ID, Guild.ID)));
      }) );

    this.route.firstChild.paramMap.subscribe(path => {
      return this.current = this.generalcollectserv
        .getCurrent(this.guilds$, path.get('GuildID'));
    });
  }
}
