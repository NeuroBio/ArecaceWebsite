import { Component, OnInit } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})

export class CopyrightComponent implements OnInit{

  mainText: string;

  constructor(private textprovider: TextProvider) {}

  ngOnInit(){
    window.scroll(0,0);
    this.mainText = this.textprovider.WebsiteText
    .find(member => member.ID =='copyright').Text;
  }

 }
