import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable }                   from 'rxjs';
import { map }                          from 'rxjs/operators';

import { SurveyService }                from 'src/app/playground/activities/Surveys/survey-components/survey.service';
import { FetchService }                 from 'src/app/GlobalServices/fetch.service';
import { DisplayService }               from '../display.service';
import { AllUserDataInfo }              from 'src/app/Classes/UploadDownloadPaths';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-interact-home',
  templateUrl: './interact-home.component.html'
})

export class InteractHomeComponent implements OnInit, OnDestroy {

  type: string;
  current: string;
  userData$: Observable<LinkList>;
  UserDataInfo = new AllUserDataInfo();

  constructor(private displayserv: DisplayService,
              private surveyserv: SurveyService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.type = this.displayserv.currentDataType.value;
    const displayType = this.UserDataInfo[this.type].DisplayName;
    this.userData$ = this.displayserv.currentUserData
      .pipe(map(list => new LinkList(displayType,
      list.map(datum => new LinkListElement(datum.DisplayName, datum.ID)))
    ));
    
    this.current = this.displayserv.currentID.value;
    this.userData$.subscribe(data => {
      const index = data.Data.findIndex(datum => datum.Route === this.current);
      this.current = data.Data[index].ListName;
    }).unsubscribe();
  }

  ngOnDestroy() {
    switch(this.type) {
      case 'SurveyResults':
        return this.surveyserv.mainDisposal();
      
      default:
        return this.fetcher.disposal();
    }
  }

}
