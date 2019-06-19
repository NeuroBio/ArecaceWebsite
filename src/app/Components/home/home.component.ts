import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }
    /*Finish implementing this later
    import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
    import { tap } from 'rxjs/operators';
    
    noService:boolean;
    private firebaseserv: FireBaseService
    this.firebaseserv.returnCollect('ConnectionTest')
    .subscribe(x =>{
      console.log(x);
      this.noService = false
    })
    
    <div *ngIf="noService">test</div>
    */   

}
