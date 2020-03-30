import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  @Input() item: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
