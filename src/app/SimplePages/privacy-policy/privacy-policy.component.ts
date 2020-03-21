import { Component, OnInit } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  dataPolicy: string;

  constructor(private textprovider: TextProvider) { }

  ngOnInit(): void {
    this.dataPolicy = this.textprovider.WebsiteText
      .find(member => member.ID =='datapolicy').Text;
  }

}
