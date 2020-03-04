import { Component, OnInit, OnDestroy}                    from '@angular/core';
import { ActivatedRoute }                      from '@angular/router';

import { CharacterMetaData}                    from '../../../../Classes/ContentClasses';
import { GlobalVarsService }                   from 'src/app/GlobalServices/global-vars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-charactersdetails',
  templateUrl: './charactersdetails.component.html',
  styleUrls: ['./charactersdetails.component.css']
})

export class CharactersDetailsComponent implements OnInit, OnDestroy {

  char: CharacterMetaData;
  loading: boolean;
  FullBio = false;
  stream1: Subscription;
  
  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Chara: CharacterMetaData}) => {
        window.scroll(0,0);
        this.stream1 = this.global.ImagesLoadable.subscribe(load => this.loading = load);
        this.char = data.Chara;
        this.char.References = this.blowupReorganization(this.char.References);
        this.FullBio = (this.char.BriefBackground === '');
   });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  changeBio(toggle: boolean) {
    this.FullBio = toggle;
  }

  //consequence of reoganization the uploads such that links can only be packages one way.
  //If this is too horrible, character references may need their own edit form.
  blowupReorganization(refs: any[]) {
    refs.map((ref, index) =>
      ref.Links = [this.char.Links[(index+1)*2],
                  this.char.Links[(index+1)*2+1]]);
    return refs;
  }

}
