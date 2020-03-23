import { Component, OnInit, HostListener, OnDestroy }   from '@angular/core';
import { ActivatedRoute, Router }                       from '@angular/router';

import { Observable, Subscription }                     from 'rxjs';

import { ComicService }                                 from '../comic.service';
import { TextProvider }                                 from 'src/app/GlobalServices/textprovider.service';

import { ChapterMetaData }                              from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit, OnDestroy {

  chapterData$: Observable<ChapterMetaData[]>;
  pageIndex: string[];
  currentChapter: ChapterMetaData;
  currentPage: number;
  maxChap: number;
  loading: boolean;
  stream: Subscription;
  mainText: string;
  path: string;
  name: string;
  
  constructor(private comicserv: ComicService,
              private route: ActivatedRoute,
              private router: Router,
              private textprovider: TextProvider) { }

  ngOnInit() {
    window.scroll(0,0);
    this.chapterData$ = this.comicserv.getMetaData();
    this.chapterData$.subscribe(chap =>
      this.route.firstChild.paramMap.subscribe(path =>
        this.initialVarAssign(path, chap))
    ).unsubscribe();

    this.stream = this.comicserv.loading.subscribe(bool =>
      setTimeout(() => { this.loading = bool }, 10));
    this.mainText = this.textprovider.WebsiteText
      .find(member => member.ID === 'comic').Text;
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
    this.comicserv.disposal();
  }
  
  initialVarAssign(path: any, chap: ChapterMetaData[]) {
    const route = path.get('PageID');

    if(route === null) {//latest
      this.currentChapter = chap[chap.length-1];
      this.currentPage = this.currentChapter.NumPages;
    } else {//get specific page
      const id = route.split('-');
      this.currentChapter = chap.find(c => c.ID === +id[0]);
      this.currentPage = +id[1];    
    }
    this.maxChap = chap[chap.length-1].ID;
    this.updatePageIndex();
    this.navigate();
  }
 
  navigate(){
    this.name = `Chapter ${this.currentChapter.ID}: Page ${this.currentPage}`;
    this.path = `comic/${this.currentChapter.ID}-${this.currentPage}`;
    this.router.navigate([this.path]);
  }

  updatePageIndex() {
    this.pageIndex = Array(this.currentChapter.NumPages);
  }

  //dropdown selectors
  changePage(newpage: number) {
    this.loading=true;
    this.currentPage = (+newpage+1);
    this.navigate();
  }

  changeChapter(newchap: string, increase: boolean = true) {
    this.loading=true;
    this.chapterData$.subscribe(chaps => {
      this.currentChapter = chaps[newchap];
      if(increase) {
        this.currentPage = 1;
      } else {
        this.currentPage = this.currentChapter.NumPages;
      }
      this.updatePageIndex();
      this.navigate();
    }).unsubscribe();
  }

  // buttons
  onButton(check: boolean, incre :number) {
    if(check) {
      this.loading = true;
      this.currentPage += incre;
    } else {
      this.changeChapter((this.currentChapter.Index+incre).toString(), incre>=1);
    }
    this.navigate();
  }

  //Arrow keys (trigger button options)
  @HostListener('window:keyup', ['$event']) KeyEvent(event: KeyboardEvent) { 
    if(event.keyCode === 39 &&//right, next
      !(this.currentPage == this.currentChapter.NumPages
        && this.currentChapter.ID == this.maxChap)) {//not last page
      this.onButton(this.currentPage < this.currentChapter.NumPages,1);
    }

    if(event.keyCode === 37 &&//left, prev
      !(this.currentPage == 1
        && this.currentChapter.ID == 0)) {//not first page
        this.onButton(this.currentPage > 1, -1);
    }
  }

}