import { Component, OnInit, OnDestroy }          from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router }             from '@angular/router';

import { Observable, Subscription }                 from 'rxjs';
import { map, filter, take, skipWhile, tap }                        from 'rxjs/operators';

import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';
import { LinkList }                   from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { LinkListElement }            from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { CharacterMetaData } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-charactersmain',
  templateUrl: './charactersmain.component.html'
})

export class CharactersMainComponent implements OnInit, OnDestroy {
 
  current: string;
  characters$: Observable<LinkList>;
  stream: Subscription;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.characters$ = this.generalcollectserv.returnMetaData().pipe(
      map((characters: CharacterMetaData[]) => {
        characters.sort((a,b) => a.ID < b.ID ? -1 : 1);
        return new LinkList('Characters', characters.map(character =>
          new LinkListElement(character.FirstName, character.ID)) );
      })
    )

    this.getCurrent();
    if(!this.current) {
      this.waitforChild();
    }
  }

  ngOnDestroy() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }

  getCurrent() {
    this.route.firstChild.paramMap.subscribe(path => {
        return this.current = this.generalcollectserv
        .getCurrent(this.characters$, path.get('CharaID'));
    });
  }

  waitforChild() {
    this.stream = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      skipWhile(() => this.route.firstChild === undefined),
      take(1)
    ).subscribe(() => {
        if(this.route.firstChild && !this.current) {
          this.getCurrent();
        }
    });
  }

}