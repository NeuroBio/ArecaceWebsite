import { Component, OnInit}                    from '@angular/core';
import { ActivatedRoute }                      from '@angular/router';

import { CharacterMetaData}                    from '../../../Classes/ContentClasses';
import { GlobalVarsService }                   from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-charactersdetails',
  templateUrl: './charactersdetails.component.html',
  styleUrls: ['./charactersdetails.component.css']
})

export class CharactersDetailsComponent implements OnInit {

  char: CharacterMetaData;
  loading: boolean;
  FullBio = false;
  
  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Chara: CharacterMetaData}) => {
        window.scroll(0,0);
        this.loading = this.global.ImagesLoadable;
        this.char = data.Chara;
        this.char.References = this.blowupReorganization(this.char.References);
        this.FullBio = (this.char.BriefBackground === '');
   });
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
