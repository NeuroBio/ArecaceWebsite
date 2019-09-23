import { Injectable } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { CharacterMetaData } from 'src/app/Classes/charactermetadata';
import { CRUD } from '../../services/CRUD.service';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { DateInfo } from 'src/app/Classes/datedata';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  DateInfo = new DateInfo();

  constructor(private controller: CRUDcontrollerService,
              private crud: CRUD,
              private firebaseserv: FireBaseService) { }

  updateBirthdayData(char: CharacterMetaData) {
    // let charList = this.controller.itemList.value;
    this.firebaseserv.returnDocument('CloudData/Birthdays')
    .pipe(take(1)).subscribe(birthdays => {
      birthdays = JSON.parse(birthdays.Birthdays);
      const date = this.arecacetoEarthConverter(char.Qt, char.Day);
      const index = birthdays.find(birthday => birthday.Name == char.FirstName);
      if(index) {
        if(date === birthdays[index].Date) {
          return;
        }
        birthdays[index].Date = date;
      } else {
        birthdays.push({
          Name: char.FirstName,
          Date: date
        });
      }
      const Final = {Birthdays: JSON.stringify(birthdays)};
      return this.crud.editItem(Final, 'CloudData', 'Birthdays');
    });
  }

  arecacetoEarthConverter(QT: string, day: number) {
    const month = this.DateInfo.ArecaceMonthNames
                                .findIndex(month => QT === month)+1;
    const dateCheck = `${this.DateInfo.quickFormat(month)}-${this.DateInfo.quickFormat(day)}`
    const index = this.DateInfo.ArecaceDates
                                .findIndex(date => dateCheck === date);
    return(this.DateInfo.EarthDates[index])
  }
}
