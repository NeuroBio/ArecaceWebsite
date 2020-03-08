import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute }             from '@angular/router';

import { Observable }                 from 'rxjs';
import { map }                        from 'rxjs/operators';

import { ReferenceCategories }        from 'src/app/Classes/UploadDownloadPaths';
import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-culturemain',
  templateUrl: './culturemain.component.html'
})
export class CulturemainComponent implements OnInit {

  cats: ReferenceCategories = new ReferenceCategories;
  labels: string[] = this.cats.culture;
  current: string;
  cultureRefs$: Observable<string[][][]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cultureRefs$ = this.generalcollectserv.returnMetaData().pipe(
      map(refs => {
        let final:string[][][] = [];
        for(let cat of this.labels) {
          final.push(refs.filter(ref => ref.Category === cat)
                          .map(filtered => [filtered.Topic, filtered.ID]));
        }
        return final; 
      })
    );
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('CultureID'));
  }

}
