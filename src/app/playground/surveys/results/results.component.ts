import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() results = {Text: "Results info.",
                      Link: "Test",
                      LinkName: "A Link!",
                      Match: 89};

  constructor() { }

  ngOnInit() {
  }

}
