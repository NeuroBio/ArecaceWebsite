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

  @ViewChild('flag', { static: true }) flag: ElementRef;
  title: string = 'Arecace';
  year: number = new Date().getFullYear()
  linkList: {}[] = [{link:'home', name: 'home'},
                    {link:'comic', name: 'comic'},
                    {link:'story', name: 'story'},
                    {link:'world', name: 'world'},
                    {link:'playground', name: '*play*'},
                    {link:'extras', name: 'extras'},
                    {link:'dash', name: 'dash'}]

  constructor(private global: GlobalVarsService) { }

  ngAfterViewInit() {
    setTimeout(() => { this.checkLoad() }, 1000);
  }

  checkLoad() {
    if(this.flag.nativeElement.offsetWidth !== 1) {
      if(this.global.phone) {
        this.global.ImagesLoadable.next(false);
      } else {
        this.global.ImagesLoadable.next(false);
      }
    }
  }
}
