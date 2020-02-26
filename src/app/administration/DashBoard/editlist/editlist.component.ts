import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }        from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.css']
})

export class EditListComponent implements OnInit, OnDestroy {
  
  path: string;
  type: string;

  selected: string;
  selectable: any[];
  loading: boolean = false;

  stream1: Subscription;
  stream2: Subscription;

  constructor(private controller: CRUDcontrollerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.stream1 = this.controller.itemType.subscribe(type => {
      this.type = type;
      this.controller.assignEditItem(undefined);
      this.loading = true;
      this.controller.assignItemList(this.controller.firePaths.value[type]);
    });

    this.stream2 = this.controller.itemList.subscribe(list => {
      this.selectable = list;
      this.forPagesInit();
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.controller.assignEditItem(undefined);
  }

  onSelect(selected: string, ind: number) {
      this.selected = selected;
      if(this.type === "Website") {
        this.router.navigate([`./${this.selected}`], {relativeTo: this.route})
      }
      this.controller.assignEditItem(this.selectable[ind]);
  }

  forPagesInit() {
    if(this.type === "Website"  && this.selectable) {
      const access = this.route.snapshot.firstChild.url.toString();
      this.controller.assignEditItem(this.selectable.find(element =>
        element.ID === access));
      this.selected = access; 
    }
  }

}