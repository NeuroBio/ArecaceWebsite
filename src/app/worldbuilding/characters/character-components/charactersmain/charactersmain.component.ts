import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute }             from '@angular/router';

import { Observable }                 from 'rxjs';
import { map }                        from 'rxjs/operators';

import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';
import { LinkList }                   from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { LinkListElement }            from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-charactersmain',
  templateUrl: './charactersmain.component.html'
})

export class CharactersMainComponent implements OnInit {
 
  current: string;
  characters$: Observable<LinkList>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.characters$ = this.generalcollectserv.returnMetaData().pipe(
      map(characters => {
        characters.sort((a,b) => a.ID < b.ID ? -1 : 1);
        return new LinkList('Characters', characters.map(character =>
          new LinkListElement(character.FirstName, character.ID)) );
      })
    )
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('CharaID') );
  }
}