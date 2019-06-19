import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { Observable }               from 'rxjs';
import { map, tap }                      from 'rxjs/operators';

import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-charactersmain',
  templateUrl: './charactersmain.component.html'
})

export class CharactersMainComponent implements OnInit {
 
  current: string;
  characters$: Observable<string[]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.characters$ = this.generalcollectserv.returnMetaData().pipe(
      map(characters => {
        characters = characters.map(character => [character.FirstName, character.ID]);
        return characters.sort((a,b) => a[0] < b[0] ? -1 : 1)
      })
    )
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('CharaID')
    )
  }
}