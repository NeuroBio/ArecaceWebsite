import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralMetaData } from 'src/app/Classes/ContentClasses';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-details-display',
  templateUrl: './details-display.component.html',
  styleUrls: ['./details-display.component.css']
})

export class DetailsDisplayComponent implements OnInit {

  loading: boolean;
  ref: GeneralMetaData;

  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Ref: GeneralMetaData})=>{
      window.scroll(0,0);
      this.loading = this.global.ImagesLoadable;
      this.ref = data.Ref;
    });
  }

}
