import { Component, OnInit }            from '@angular/core';
import { ActivatedRoute }               from '@angular/router';

import { Observable }                   from 'rxjs';
import { map }                          from 'rxjs/operators';

import { GeneralcollectionService }     from 'src/app/GlobalServices/generalcollection.service';

import { ReferenceCategories }          from 'src/app/Classes/UploadDownloadPaths';
import { LinkList, LinkListElement }    from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-sourcesiphoindmain',
  templateUrl: './sourcesiphoidmain.component.html'
})

export class SourceSiphoidMainComponent implements OnInit {

  cats: ReferenceCategories = new ReferenceCategories;
  current: string;
  sourceRefs$: Observable<LinkList[]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sourceRefs$ = this.generalcollectserv.returnMetaData().pipe(
      map(refs => {
        let final:LinkList[] = [];
        for(let cat of this.cats.source) {
          const Data = refs.filter(ref =>
            ref.Category === cat).map(filtered =>
            new LinkListElement(filtered.Topic, filtered.ID));
          final.push(new LinkList(cat, Data));
        }
        return final; 
      }) );

    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('SourceID') );
  }
}
