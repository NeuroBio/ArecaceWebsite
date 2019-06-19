import { Component, ViewEncapsulation,
  ViewChild, ElementRef, AfterViewInit }    from '@angular/core';
import { GlobalVarsService}                 from './GlobalServices/global-vars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewInit{

  @ViewChild('flag') flag: ElementRef;
  title: string = 'Arecace';
  year: number = new Date().getFullYear()
  linkList: string[] = ['home', 'comic', 'story',
                        'world', 'extras', 'login']

  constructor(private global: GlobalVarsService){}

  ngAfterViewInit(){
    if((this.flag.nativeElement.offsetWidth == 1 && this.flag.nativeElement.readyState == 'complete') ||
    (this.flag.nativeElement.offsetWidth == 1 && this.flag.nativeElement.readyState == undefined)){
      this.global.ImagesLoadable = true;
    }else{
      this.global.ImagesLoadable = false;
    }
  }

}
