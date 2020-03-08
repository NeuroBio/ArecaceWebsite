import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute }                       from '@angular/router';

import { CharacterMetaData}                     from '../../../../Classes/ContentClasses';
import { GlobalVarsService }                    from 'src/app/GlobalServices/global-vars.service';
import { GetRouteSegmentsService }              from 'src/app/GlobalServices/commonfunctions.service';
import { DownloadPageService }                  from 'src/app/SimplePages/downloadpage/download-page.service';

@Component({
  selector: 'app-charactersdetails',
  templateUrl: './charactersdetails.component.html',
  styleUrls: ['./charactersdetails.component.css']
})

export class CharactersDetailsComponent implements OnInit {

  char: CharacterMetaData;
  loading: boolean;
  FullBio = false;
  name: string;
  path: string;
  real: boolean;
  
  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService,
              private downloadserv: DownloadPageService,
              private getsegserv: GetRouteSegmentsService) { }

  ngOnInit() {
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.route.data.subscribe((data: {Data: CharacterMetaData}) => {
        window.scroll(0,0);
        this.loading = this.global.ImagesLoadable.value;
        const frags = mainPath.split('/')
        this.real = frags[frags.length-1] === 'FanCharacters' ? false : true;
        this.char = data.Data;
        this.name = `${this.char.FirstName} ${this.char.LastName}`
        this.path = `/${mainPath}/${this.char.ID}`
        this.char.References = this.blowupReorganization(this.char.References);
        this.FullBio = (this.char.BriefBackground === '');
   });
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

  viewFull() {
    this.downloadserv.assignImgUrl(this.char.Links[1])
  }

}
