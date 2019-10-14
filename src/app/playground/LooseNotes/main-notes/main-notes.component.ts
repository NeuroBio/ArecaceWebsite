import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-notes',
  templateUrl: './main-notes.component.html',
  styleUrls: ['./main-notes.component.css']
})
export class MainNotesComponent implements OnInit {

  current: string;
  notes$: Observable<string[][][]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.notes$ = this.generalcollectserv.returnMetaData().pipe(
      map((notes) => {
        notes.sort((a,b) => a.TimeStampCreated < b.TimeStampCreated ? 1 : -1);
        return notes.map(note => [note.ShortTitle, note.ID]);
      })
    );
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('NotesID'));
  }
}
