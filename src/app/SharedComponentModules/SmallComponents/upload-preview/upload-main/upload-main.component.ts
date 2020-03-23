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
  styleUrls: ['../../../../administration/Forms/Form.css', './upload-main.component.css']
})

export class UploadMainComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() ID: number;
  @Input() hasThumb: boolean;
  @Input() Settings: UploadPreviewSettings =
  new UploadPreviewSettings([[undefined, undefined, undefined],
                            [undefined, undefined, undefined]]);
  
  @ViewChild('mainInput', { static: true }) mainUploader: ElementRef;
  @ViewChild('thumbInput') thumbUploader: ElementRef;
  mainImg: UploadPreviewInfo;
  thumbImg: UploadPreviewInfo;
  mainRequirements: string;
  thumbRequirements: string;
  oldThumb: string;
  oldMain: string;

  stream1: Subscription;
  stream2: Subscription;
  autoGenerate;

  constructor(private previewserv: UploadPreviewService,
              private resizeserv: ImageResizerService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.mainRequirements = this.setReq(this.Settings.main, 'Main');
    this.thumbRequirements = this.setReq(this.Settings.thumb, 'Thumb');
    this.onReset();
    this.stream1 = this.previewserv.reset.subscribe(() => this.onReset());
    this.stream2 = this.previewserv.oldLinks.subscribe(links => {
      if(links.length === 0) {
        this.oldMain = undefined;
        this.oldThumb = undefined;
      } else if(links.length > 1) {
        this.oldMain = links[this.ID*2+1];
        this.oldThumb = links[this.ID*2];
      } else {
        this.oldMain = links[this.ID];
      }

    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  setReq(settings: any, type: string) {
    const maxHeight = settings.MaxHeight === undefined ? 'none': `${settings.MaxHeight}px`;
    const maxWidth = settings.MaxHeight === undefined ? 'none': `${settings.MaxWidth}px`;
    return `${type} images must be of type jpeg, png, or gif.
    \nMax Height: ${maxHeight}
    \nMax Width: ${maxWidth}
    \nMax Size: ${settings.MaxSizeRead}`;
  }

  switchThumbType() {
    this.autoGenerate = !this.autoGenerate;
    this.thumbImg.ImgUrl = undefined;
    if(this.autoGenerate === true) {
      if(this.mainImg.ImgUrl) {
        this.uploadImage(this.previewserv.mainsData[this.ID], 'auto');
      }
    } else {
      this.previewserv.assignThumb(this.ID, undefined);
    }
  }

  uploadImage(event: any, imgType: string) {
    switch(imgType) {
      case 'thumb':
        return this.CheckandAssign(event, imgType)
        .catch(error => {
          this.thumbUploader.nativeElement.value = '';
          alert(error[1]);
        });

      case 'main':
        return this.CheckandAssign(event, imgType)
        .then((url: string) => {
          if(this.autoGenerate === true && this.hasThumb === true) {
              return this.previewserv.checkFile(event, this.Settings.thumb)
              .then(() => this.loadImage('thumb', event, url))
              .catch(() => this.makeThumb(event));
          }
        }).catch(error => {
          this.mainUploader.nativeElement.value = '';
          alert(error[1]);
        });

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
      const phauxEvent = {target: {files: [this.resizeserv.b64toBlob(resized)]}};
      this.loadImage('thumb', phauxEvent, resized);
      this.thumbImg.Loading = false;
      this.fetcher.assignLoading(false);
    }).catch(() => {
      this.thumbImg.Loading = false;
      this.fetcher.assignLoading(false);
    });
  }

  CheckandAssign(event: any, type: string) {
    return new Promise((resolve, reject) => 
      this.previewserv.checkFile(event, this.Settings[type])
      .then(() => {
        this.previewserv.quickFiletob64(event)
          .then((url: string) => {
            this.loadImage(type, event, url);
            return resolve(url);
          });
      }).catch(error => { return reject(error); })
      );
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
    if(this.thumbUploader) {
      this.thumbUploader.nativeElement.value = '';
    }
    this.autoGenerate = true;
    this.previewserv.erase(this.ID);
    this.mainImg = new UploadPreviewInfo(`${this.name}-main`, undefined, false, undefined);
    this.thumbImg = new UploadPreviewInfo(`${this.name}-thumb`, undefined, false, undefined);
  }
}
