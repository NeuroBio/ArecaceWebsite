import { Component, OnInit } from '@angular/core';

import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements OnInit {

  accessibility: string;

  constructor(private textprovider: TextProvider) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.accessibility = this.textprovider.WebsiteText
      .find(member => member.ID === 'accessibility').Text;
  }

}
