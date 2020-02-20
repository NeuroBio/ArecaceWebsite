import { Component, OnInit } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-nomadic-syntax',
  templateUrl: './nomadic-syntax.component.html',
  styleUrls: ['./nomadic-syntax.component.css']
})
export class NomadicSyntaxComponent implements OnInit {

  mainText: string;

  constructor(private textprovider: TextProvider) { }

  ngOnInit() {
    this.mainText = this.textprovider.WebsiteText.find(member =>
      member.ID =='nomadicsyntax');
  }

}