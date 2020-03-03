import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.css']
})

export class UploadPreviewComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() imgUrl: string;
  @Input() loading: boolean
  neverLoading: boolean;

  constructor(private global: GlobalVarsService) { }

  ngOnInit() {
    this.neverLoading = !this.global.ImagesLoadable;
  }

  ngOnChanges() {
    console.log("tick!")
  }

}
