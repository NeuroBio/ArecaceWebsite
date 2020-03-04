import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UploadPreviewInfo, UploadPreviewSettings } from '../uploadpreviewclass';
import { UploadPreviewService } from '../upload-preview.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { ImageResizerService } from 'src/app/administration/services/image-resizer.service';


@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['../../../administration/Forms/Form.css', './upload-main.component.css']
})
export class UploadMainComponent implements OnInit {

  @Input() name: string;
  @Input() ID: number;
  @Input() hasThumb: boolean;
  @Input() Settings: UploadPreviewSettings =
  new UploadPreviewSettings([[undefined, undefined, undefined],
                            [undefined, undefined, undefined]]);
  
  @ViewChild('main', { static: true }) mainUploader: ElementRef;
  @ViewChild('thumb', { static: true }) thumbUploader: ElementRef;
  mainImg: UploadPreviewInfo;
  thumbImg: UploadPreviewInfo;

  autoGenerate = true;

  constructor(private previewserv: UploadPreviewService,
              private resizeserv: ImageResizerService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.mainImg = new UploadPreviewInfo(`${this.name}-main`, undefined, false, undefined);
    this.thumbImg = new UploadPreviewInfo(`${this.name}-thumb`, undefined, false, undefined);
  }

  switchThumbType() {
    this.autoGenerate = !this.autoGenerate;
    if(this.autoGenerate === true) {
      if(this.mainImg.ImgUrl) {
        this.uploadImage(this.previewserv.mainsData[this.ID], 'auto')
      }
    } else {
      this.previewserv.assignThumb(this.ID, undefined);
      this.thumbImg.ImgUrl = undefined;
    }
  }

  uploadImage(event: any, imgType: string) {
    switch(imgType) {
      case 'thumb':
        console.log(imgType);
        return this.CheckandAssign(event, imgType)
        .catch(error => alert(error[1]));

      case 'main':
        console.log(imgType);
        return this.CheckandAssign(event, imgType)
        .then(() => {
          if(this.autoGenerate === true && this.hasThumb === true) {
            this.makeThumb(event);
          }
        }).catch(error => alert(error[1]));

      case 'auto':
        this.makeThumb(event);
        break;
    }

  }
  
  makeThumb(event: any) {
    this.thumbImg.Loading = true;
    this.fetcher.assignLoading(true);
    //async function that returns a promise
    this.resizeserv.resizeImage(event.target.files[0],
                                this.Settings.thumb.MaxHeight,
                                this.Settings.thumb.MaxWidth, false)
    .then((resized: string) => {
      this.thumbImg.ImgUrl = resized;
      this.thumbImg.Loading = false;
      this.previewserv.assignThumb(this.ID, {target: {files: [resized]}});
      this.fetcher.assignLoading(false);
    }).catch(err => {
      console.log(err);
      this.thumbImg.Loading = false;
      this.fetcher.assignLoading(false);
    });
  }

  CheckandAssign(event: any, type: string) {
    return new Promise((resolve, reject) => {
      console.log(this.Settings[type])
      this.previewserv.checkFile(event, this.Settings[type])
      .then(() => {
        this.previewserv.quickFiletob64(event)
          .then((url: string) => resolve(this.loadImage(type, event, url)));
      }).catch(error => {
        console.log("rejecting")
        return reject(error)
        //this.thumbUploader.nativeElement.value = '';
      })
    });
  }

  loadImage(type: string, event: any, url: string) {
    if(type === 'thumb') {
      this.previewserv.assignThumb(this.ID, event);
      this.thumbImg.ImgUrl = url;
    } else {
      this.previewserv.assignMain(this.ID, event);
      this.mainImg.ImgUrl = url;
    }
  }

 onReset() {
    this.mainUploader.nativeElement.value = '';
    this.thumbUploader.nativeElement.value = '';
    this.previewserv.erase(this.ID);
    this.mainImg = new UploadPreviewInfo(`${this.name}-main`, undefined, false, undefined);
    this.thumbImg = new UploadPreviewInfo(`${this.name}-thumb`, undefined, false, undefined);
  }
}
