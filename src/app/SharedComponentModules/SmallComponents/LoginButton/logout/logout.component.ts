import { Component } from '@angular/core';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
