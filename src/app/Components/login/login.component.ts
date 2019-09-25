import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mainText: string;
  constructor(public auth: AuthService,
              private textprovider: TextProvider) { }

  ngOnInit() {
    this.mainText = this.textprovider.WebsiteText
                        .find(member => member.ID =='login').Text;
  }

}
