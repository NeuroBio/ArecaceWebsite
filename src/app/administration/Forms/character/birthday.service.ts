import { Injectable } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { CharacterMetaData } from 'src/app/Classes/ContentClasses';
import { CRUD } from '../../services/CRUD.service';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { DateInfo } from 'src/app/Classes/ArecacenDates';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  DateInfo = new DateInfo();

  constructor(private crud: CRUD,
              private firebaseserv: FireBaseService) { }

  updateBirthdayData(char: CharacterMetaData) {
    this.firebaseserv.returnDocument('CloudData/Birthdays')
    .pipe(take(1)).subscribe(birthdays => {
      birthdays = JSON.parse(birthdays.Birthdays);
      const date = this.DateInfo.arecacetoEarthConverter(char.Qt, char.Day);
      const index = birthdays.findIndex(birthday => birthday.Name === char.FirstName);
      if (index) {
        if (date === birthdays[index].Date) {
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

}
