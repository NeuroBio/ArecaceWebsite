import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralMetaData } from 'src/app/Classes/ContentClasses';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-display',
  templateUrl: './details-display.component.html',
  styleUrls: ['./details-display.component.css']
})

export class DetailsDisplayComponent implements OnInit, OnDestroy {

  loading: boolean;
  ref: GeneralMetaData;
  stream1: Subscription;

  constructor(private route: ActivatedRoute,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Ref: GeneralMetaData})=>{
      window.scroll(0,0);
      this.stream1 = this.global.ImagesLoadable.subscribe(load => this.loading = load);
      this.ref = data.Ref;
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }
}
