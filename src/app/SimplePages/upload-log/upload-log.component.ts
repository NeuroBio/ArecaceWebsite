import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { map } from 'rxjs/operators'; 
@Component({
  selector: 'app-upload-log',
  templateUrl: './upload-log.component.html',
  styleUrls: ['./upload-log.component.css']
})
export class UploadLogComponent implements OnInit {

  changes = [{Date: 'today', Type: 'idk', Link: '/lol'}]

  constructor(private fire: FireBaseService) { }

  ngOnInit() {
    this.fire.returnCollect('NewestCue')
    .pipe(map(x => x.sort((a,b) => a.UploadTime > b.UploadTime ? -1 : 1)))
    .subscribe(x => this.changes = x);
  }

}
