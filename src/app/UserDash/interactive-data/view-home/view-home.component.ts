import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})
export class ViewHomeComponent implements OnInit {

  type: string;
  current: string;
  userData$: Observable<any[]>;

  constructor(private generalcollectionserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("trying")
    this.userData$ = this.generalcollectionserv.returnMetaData();
    console.log(this.route.snapshot.firstChild.url)
  }

}
