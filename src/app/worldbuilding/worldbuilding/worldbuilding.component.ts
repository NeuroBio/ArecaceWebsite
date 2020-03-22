import { Component, OnInit }          from '@angular/core';
import { Title }                      from '@angular/platform-browser';

@Component({
  selector: 'app-worldbuilding',
  templateUrl: './worldbuilding.component.html',
  styleUrls: ['./worldbuilding.component.css']
})

export class WorldbuildingComponent implements OnInit {

  navInfo: any[] = [{ link: 'introduction', name: 'Introduction', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fintro%202.png?alt=media&token=32c3f3d8-063d-4923-8f39-dc7890deb8e1' },
                    { link: 'bestiary', name:'Bestiary', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fbestiary.png?alt=media&token=420ff3f9-b984-4ed3-9c92-224f54656fd5' },
                    { link: 'characters', name:'Characters', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fcharacters.png?alt=media&token=890227f4-e0ff-408c-b950-470c10f6704e' },
                    { link: 'culture', name:'Culture', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fculture.png?alt=media&token=8357e30d-5839-46ad-88a6-3b1db9ddbfef' },
                    { link: 'maps', name:'Maps', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fintro.png?alt=media&token=7d07824c-ee14-473f-9b1c-1af30f9d8fa4' },
                    { link: 'source', name:'Source and Siphoid', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fsource.png?alt=media&token=93ad9b0d-7dda-429a-9323-3f92ff83fec4' },
                    { link: 'guilds', name: 'The DIA and Guilds', src: 'https://firebasestorage.googleapis.com/v0/b/arecaceworld.appspot.com/o/WebSite%2Fworld%20buttons%2Fguilds.png?alt=media&token=9ca20138-76ed-4a0e-a45a-f15c73c45506' } ];

  constructor(private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('World');
    window.scroll(0,0);
  }

 }
