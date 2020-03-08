import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckConnectionService } from './check-connection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-badservice',
  templateUrl: './badservice.component.html',
  styleUrls: ['./badservice.component.css']
})
export class BadserviceComponent implements OnInit, OnDestroy {

  stream1: Subscription;
  // stream2: Subscription;
  service: boolean;
  error: string;

  constructor(private checkconnectserv: CheckConnectionService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.stream1 = this.checkconnectserv.service
      .subscribe(service => {
        this.service = service
      });
    // this.stream2 = this.checkconnectserv.error
    //   .subscribe(err => this.error = err);
    
    this.checkconnectserv.testConnection();
  }
  
  ngOnDestroy() {
    this.stream1.unsubscribe();
    // this.stream2.unsubscribe();
    this.checkconnectserv.clear();
  }

  checkAgain() {
    this.checkconnectserv.testConnection();
  }
}
