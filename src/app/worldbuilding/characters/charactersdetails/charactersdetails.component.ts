import { Component, OnInit}                    from '@angular/core';
import { ActivatedRoute }                      from '@angular/router';

import { CharacterMetaData}                    from '../../../Classes/charactermetadata';
import { GlobalVarsService }                   from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-charactersdetails',
  templateUrl: './charactersdetails.component.html',
  styleUrls: ['./charactersdetails.component.css']
})

export class CharactersDetailsComponent implements OnInit {

  char: CharacterMetaData;
  loading: boolean;
  FullBio: boolean=false;
  
  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Chara: CharacterMetaData}) => {
        window.scroll(0,0);
        this.loading = this.global.ImagesLoadable;
        this.char = data.Chara;
        this.FullBio = (this.char.BriefBackground === '');
   });
  }

  changeBio(toggle: boolean){
    this.FullBio = toggle;
  }

}
