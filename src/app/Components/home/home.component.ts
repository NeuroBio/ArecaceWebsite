import { Component, OnInit, HostListener } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  buttonText: string[];
  mainText: string;

  constructor(private textprovider: TextProvider) { }

  ngOnInit() {
    this.mainText = this.textprovider.WebsiteText
                        .find(member => member.ID === 'home').Text
    window.scroll(0,0);
    this.setButtonText();
  }

  @HostListener('window:resize')
  setButtonText() {
    if(window.innerWidth < 560){
      this.buttonText = ['Intro', 'Scripts','Comic','Play- ground'];
    }else{
      this.buttonText = ['Full Introduction',
              'Start Comic Scripts',
              'See Latest Page',
              'Playgound (under construction!)'];
    }
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
