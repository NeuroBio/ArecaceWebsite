import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pixel-army',
  templateUrl: './pixel-army.component.html',
  styleUrls: ['./pixel-army.component.css']
})
export class PixelArmyComponent implements OnInit {

  pixels$: Observable<any>;

  constructor(private firebaseserv: FireBaseService) { }

  ngOnInit() {
    this.pixels$ = this.firebaseserv.returnCollect('Pixels')
  }

}
