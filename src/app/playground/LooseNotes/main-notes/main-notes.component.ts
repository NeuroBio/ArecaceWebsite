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
  guilds$: Observable<string[][][]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.guilds$ = this.generalcollectserv.returnMetaData().pipe(
      map(Guilds => {
        Guilds.sort((a,b) => a.Founded < b.Founded ? -1 : 1);
        return Guilds.map(Guild => [Guild.ID, Guild.ID]);
      })
    );
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('NotesID'));
  }
}
