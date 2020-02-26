import { Component, OnInit }          from '@angular/core';

import { Observable }                 from 'rxjs';
import { map }                        from 'rxjs/operators';

import { BeastMetaData }              from 'src/app/Classes/ContentClasses';
import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';


@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.css']
})

export class BestiaryComponent implements OnInit {

  beasts$:Observable<BeastMetaData[]>;
  sortOptions: string[] = ['Name', 'Region', 'Biome', 'Phylogeny']
  phyloDict: any = {Porifera:0, Ctenophora:1, Panarthropoda:2, Mollusca:3,
                Tunicata:4, Ichthyia:5, ReptiliaAmphibia:6, Avia:7,
                Therapsida:8, Mammalia:9}
  
  constructor(private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    this.beasts$ = this.generalcollectserv.returnMetaData().pipe(
      map(beasts => {
        beasts.sort((a,b) => a.ID < b.ID ? -1 : 1);
        return beasts.sort((a,b) => a.Biome < b.Biome ? -1 : a.Biome > b.Biome ? 1 : 0);
      }));
    }


  onSort(style: string) {
    if(style !== "Phylogeny") {
      return this.beasts$.subscribe(beasts =>
        beasts.sort((a,b) => a[style] < b[style] ? -1 :1)
      ).unsubscribe();
    } else {
      return this.beasts$.subscribe(beasts =>
        beasts.sort((a,b) => this.phyloDict[a.Phylo] < this.phyloDict[b.Phylo]
                              ? -1 : this.phyloDict[a.Phylo] > this.phyloDict[b.Phylo] ? 1 : 0)
      ).unsubscribe();
    }
  }

}
