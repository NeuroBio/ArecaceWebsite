import { Component }          from '@angular/core';
import { AuthService }        from '../../security/Auth/auth.service';
import { Router }             from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

  constructor(private auth:AuthService,
              private router:Router) { }

  logout(){
    this.auth.logout();
    this.router.navigate(['/kArAAdministrativeUpload']);
  }
  
}
