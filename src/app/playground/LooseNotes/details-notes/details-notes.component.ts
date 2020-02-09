import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LooseNotesMetaData } from 'src/app/Classes/notesmetadata';

@Component({
  selector: 'app-details-notes',
  templateUrl: './details-notes.component.html',
  styleUrls: ['./details-notes.component.css']
})
export class DetailsNotesComponent implements OnInit {

  note: LooseNotesMetaData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Note: LooseNotesMetaData}) => {
      window.scroll(0,0);
      this.note = data.Note});
  }
}

