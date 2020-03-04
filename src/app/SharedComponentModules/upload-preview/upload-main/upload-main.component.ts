import { Component, OnInit, Input, ViewChild,
         ElementRef, OnDestroy }                from '@angular/core';

import { Subscription }                         from 'rxjs';

import { UploadPreviewService }                 from '../upload-preview.service';
import { FetchService }                         from 'src/app/GlobalServices/fetch.service';
import { ImageResizerService }                  from 'src/app/administration/services/image-resizer.service';

import { UploadPreviewInfo,
         UploadPreviewSettings }                from '../uploadpreviewclass';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['../../../administration/Forms/Form.css', './upload-main.component.css']
})

export class UploadMainComponent implements OnInit, OnDestroy {

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
  mainRequirements: string;
  thumbRequirements: string;

  stream1: Subscription;
  autoGenerate = true;

  constructor(private previewserv: UploadPreviewService,
              private resizeserv: ImageResizerService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.mainImg = new UploadPreviewInfo(`${this.name}-main`, undefined, false, undefined);
    this.thumbImg = new UploadPreviewInfo(`${this.name}-thumb`, undefined, false, undefined);
    this.mainRequirements = this.setReq(this.Settings.main, 'Main');
    this.thumbRequirements = this.setReq(this.Settings.thumb, 'Thumb');
    this.stream1 = this.previewserv.reset.subscribe(() => this.onReset());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  setReq(settings: any, type: string) {
    const maxHeight = settings.MaxHeight === undefined ? 'none': `${settings.MaxHeight}px`;
    const maxWidth = settings.MaxHeight === undefined ? 'none': `${settings.MaxWidth}px`;
    return `${type} images must be of type jpeg, png, or gif.
    \nMax Height: ${maxHeight}
    \nMax Width: ${maxWidth}
    \nMax Size: ${settings.MaxSizeRead}`
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
        return this.CheckandAssign(event, imgType)
        .catch(error => alert(error[1]));

      case 'main':
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
    this.resizeserv.resizeImage(event.target.files[0],
                                this.Settings.thumb.MaxHeight,
                                this.Settings.thumb.MaxWidth, false)
    .then((resized: string) => {
      const phauxEvent = {target: {files: [this.resizeserv.b64toBlob(resized)]}}
      this.loadImage('thumb', phauxEvent, resized)
      this.thumbImg.Loading = false;
      this.fetcher.assignLoading(false);
    }).catch(err => {
      console.log(err);
      this.thumbImg.Loading = false;
      this.fetcher.assignLoading(false);
    });
  }

  CheckandAssign(event: any, type: string) {
    return new Promise((resolve, reject) => {
      this.previewserv.checkFile(event, this.Settings[type])
      .then(() => {
        this.previewserv.quickFiletob64(event)
          .then((url: string) => resolve(this.loadImage(type, event, url)));
      }).catch(error => {
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
