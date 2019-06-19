import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';
import { GeneralcollectionService }         from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-blowupmaster',
  templateUrl: './blowupmaster.component.html'
})
export class BlowupmasterComponent implements OnInit {

  linksList: any[];
  index: number;
  gridPath: string;

  constructor(private route: ActivatedRoute,
    private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    this.gridPath = this.route.parent.snapshot.url.join('/');
    this.generalcollectserv.returnMetaData().subscribe(collect => 
      this.linksList = collect).unsubscribe();

    this.route.data.subscribe(data => 
      this.index = this.linksList.findIndex(member => member.ID === data.links.ID));  
  }

}
