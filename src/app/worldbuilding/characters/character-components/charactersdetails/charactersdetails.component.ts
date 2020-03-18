import { Component, OnInit, OnDestroy }                    from '@angular/core';
import { ActivatedRoute }                       from '@angular/router';

import { CharacterMetaData}                     from '../../../../Classes/ContentClasses';
import { GlobalVarsService }                    from 'src/app/GlobalServices/global-vars.service';
import { GetRouteSegmentsService }              from 'src/app/GlobalServices/commonfunctions.service';
import { BookmarkService } from 'src/app/SharedComponentModules/bookmark/bookmark.service';

@Component({
  selector: 'app-charactersdetails',
  templateUrl: './charactersdetails.component.html',
  styleUrls: ['./charactersdetails.component.css']
})

export class CharactersDetailsComponent implements OnInit, OnDestroy {

  char: CharacterMetaData;
  loading: boolean;
  FullBio = false;
  name: string;
  path: string;
  
  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService,
              private getsegserv: GetRouteSegmentsService,
              private bookmarkserv: BookmarkService) { }

  ngOnInit() {
    const frags = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.route.data.subscribe((data: {Data: CharacterMetaData}) => {
        // this.main.nativeElement.scrollIntoView();
        this.loading = this.global.ImagesLoadable.value;
        const real = frags[frags.length-1] === 'FanCharacters' ? false : true;
        this.bookmarkserv.real.next(real);
        this.char = data.Data;
        this.name = `${this.char.FirstName} ${this.char.LastName}`
        this.path = `/${frags.join('/')}/${this.char.ID}`
        this.char.References = this.blowupReorganization(this.char.References);
        this.FullBio = (this.char.BriefBackground === '');
   });
  }

  ngOnDestroy() {
    this.bookmarkserv.dispose();
  }

  changeBio(toggle: boolean) {
    this.FullBio = toggle;
  }

  blowupReorganization(refs: any[]) {
    refs.map((ref, index) =>
      ref.Links = [this.char.Links[(index+1)*2],
                  this.char.Links[(index+1)*2+1]]);
    return refs;
  }

}
