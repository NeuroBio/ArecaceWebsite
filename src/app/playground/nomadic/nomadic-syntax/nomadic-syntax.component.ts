import { Component, OnInit }    from '@angular/core';
import { TextProvider }         from 'src/app/GlobalServices/textprovider.service';
import { Title }                from '@angular/platform-browser';

@Component({
  selector: 'app-nomadic-syntax',
  templateUrl: './nomadic-syntax.component.html',
  styleUrls: ['./nomadic-syntax.component.css']
})
export class NomadicSyntaxComponent implements OnInit {

  mainText: string;

  constructor(private textprovider: TextProvider,
              private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Nomadic: Syntax');
    this.mainText = this.textprovider.WebsiteText.find(member =>
      member.ID =='nomadicsyntax').Text;
  }

}