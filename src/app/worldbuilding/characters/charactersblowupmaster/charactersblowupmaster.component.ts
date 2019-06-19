import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';
import { GeneralcollectionService }         from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-charactersblowupmaster',
  templateUrl: './charactersblowupmaster.component.html'
})

export class CharactersBlowupmasterComponent implements OnInit {

  linksList: any[];
  index: number;
  gridPath: string;

  constructor(private route: ActivatedRoute,
    private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      path =>
        this.generalcollectserv.getMember(path.get('CharaID'))
        .subscribe(chara => {
          this.linksList = chara.References;
          this.gridPath = `world/characters/${chara.ID}`
      }).unsubscribe()
    ); 
   
    this.route.data.subscribe(data => 
      this.index = this.linksList.findIndex(member =>
        member.ID === data.links.ID)
    );  
  }

}
