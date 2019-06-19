import { Component, OnInit }          from '@angular/core';

@Component({
  selector: 'app-worldbuilding',
  templateUrl: './worldbuilding.component.html',
  styleUrls: ['./worldbuilding.component.css']
})

export class WorldbuildingComponent implements OnInit{

  navInfo: any[] = [ {link:'introduction', text:'Introduction'},
                    {link:'bestiary', text:'Bestiary'},
                    {link:'characters', text:'Characters'},
                    {link:'culture', text:'Culture'},
                    {link:'maps', text:'Maps'},
                    {link:'source', text:'Source and Siphoid'},
                    {link:'guilds', text:'The DIA and Guilds'}]

  ngOnInit(){
    window.scroll(0,0);
  }

 }
