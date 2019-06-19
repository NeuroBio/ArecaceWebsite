import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travelorsguide',
  templateUrl: './travelorsguide.component.html',
  styleUrls: ['./travelorsguide.component.css']
})

export class TravelorsGuideComponent implements OnInit {

  previews: string[] = ["https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage1.png?alt=media&token=8afd8eed-2d6c-4827-b857-d6e11d9aecfc",
                        "https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage2.png?alt=media&token=69e04149-6412-43ef-a32b-0113c493a9d4",
                        "https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage3.png?alt=media&token=52551116-fa6d-4f98-ab80-038bdf32c982",
                        "https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage4.png?alt=media&token=f005a63c-9ed5-4a3b-8955-1139a5264c8b",
                        "https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage5.png?alt=media&token=fe4bdacb-1f24-4719-9e32-067330af1742",
                        "https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage6.png?alt=media&token=0e0d504a-c2ea-4285-8a9d-02dd4e80a15b",
                        "https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2FTraveler'sGuide%2Fpage7.png?alt=media&token=2c303c8a-b5f6-4b64-a8de-f6e22203cba7"
                        ]
  cost: string="??"
  index: number = 0;

  ngOnInit(){
    window.scroll(0,0);
  }

  nextPage(incre: number){
    this.index += incre;
    if(this.index === -1){
      this.index = 6;
    }else if(this.index === 7){
      this.index = 0;
    }
  }

}
