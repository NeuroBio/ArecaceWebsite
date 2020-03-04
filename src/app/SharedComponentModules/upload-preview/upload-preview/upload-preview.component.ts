import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.css']
})

export class UploadPreviewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() name: string;
  @Input() imgUrl: string;
  @Input() loading: boolean
  neverLoading: boolean;
  stream1: Subscription;

  constructor(private global: GlobalVarsService) { }

  ngOnInit() {
    this.stream1 = this.global.ImagesLoadable.subscribe(load => this.neverLoading = !load);

  }
  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  ngOnChanges() {
    console.log("tick!")
  }

}
