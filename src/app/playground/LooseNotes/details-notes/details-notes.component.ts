import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LooseNotesMetaData } from 'src/app/Classes/ContentClasses';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';
@Component({
  selector: 'app-details-notes',
  templateUrl: './details-notes.component.html',
  styleUrls: ['./details-notes.component.css']
})
export class DetailsNotesComponent implements OnInit {

  note: LooseNotesMetaData;
  name: string;
  path: string;

  constructor(private route: ActivatedRoute,
              private getsegserv: GetRouteSegmentsService) { }

  ngOnInit() {
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.route.data.subscribe((data: {Note: LooseNotesMetaData}) => {
      window.scroll(0,0);
      this.note = data.Note;
      this.name = this.note.ShortTitle;
      this.path = `/${mainPath}/${this.note.ID}`
    });
  }
}

