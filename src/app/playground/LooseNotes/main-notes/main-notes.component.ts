import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-main-notes',
  templateUrl: './main-notes.component.html',
  styleUrls: ['./main-notes.component.css']
})
export class MainNotesComponent implements OnInit {

  current: string;
  notes$: Observable<LinkList>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.notes$ = this.generalcollectserv.returnMetaData().pipe(
      map((notes: any[]) => {
        notes.sort((a, b) => a.Created < b.Created ? 1 : -1);
        return new LinkList('Notes',
        notes.map(note => new LinkListElement(note.ShortTitle, note.ID)));
    }) );

    this.route.firstChild.paramMap.subscribe(path => {
      return this.current = this.generalcollectserv
        .getCurrent(this.notes$, path.get('NotesID'));
        // this.current = path.get('NotesID')
        // this.notes$.subscribe(notes => {
        //   const index = notes.Data.findIndex(note => note.Route === this.current);
        //   this.current = notes.Data[index].ListName;
        // }).unsubscribe();
      });
    }
}
