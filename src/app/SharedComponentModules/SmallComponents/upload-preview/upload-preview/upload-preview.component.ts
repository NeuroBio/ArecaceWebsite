import { Component, OnInit, Input, OnDestroy }  from '@angular/core';

import { Subscription }                         from 'rxjs';

import { GlobalVarsService }                    from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.css']
})

export class UploadPreviewComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() imgUrl: string;
  @Input() loading: boolean;
  @Input() oldUrl: string;
  neverLoading: boolean;
  stream1: Subscription;

  constructor(private global: GlobalVarsService) { }

  ngOnInit() {
    this.stream1 = this.global.ImagesLoadable.subscribe(load => this.neverLoading = !load);
  }
  
  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

}
