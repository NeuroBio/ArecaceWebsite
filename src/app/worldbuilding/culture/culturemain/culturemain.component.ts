import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

import { ReferenceCategories } from 'src/app/Classes/UploadDownloadPaths';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-culturemain',
  templateUrl: './culturemain.component.html'
})
export class CulturemainComponent implements OnInit {

  cats: ReferenceCategories = new ReferenceCategories;
  current: string;
  cultureRefs$: Observable<LinkList[]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cultureRefs$ = this.generalcollectserv.returnMetaData()
      .pipe(map((refs: any[]) => {
        const final: LinkList[] = [];
        for (const cat of this.cats.culture) {
          const Data = refs.filter(ref =>
            ref.Category === cat).map(filtered =>
            new LinkListElement(filtered.Topic, filtered.ID));
          final.push(new LinkList(cat, Data));
        }
        return final;
      })
    );

    this.route.firstChild.paramMap.subscribe(path => {
      return this.current = this.generalcollectserv
        .getCurrent(this.cultureRefs$, path.get('CultureID'));
    });
  }

}
