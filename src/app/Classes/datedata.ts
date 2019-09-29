import { repeat } from 'rxjs/operators';

export class DateInfo {
    ArecaceMonthNames = ["Qt1-1", "Qt1-2", "Qt1-3",
                         "Qt2-1", "Qt2-2", "Qt2-3",
                         "Qt3-1", "Qt3-2", "Qt3-3",
                         "Qt4-1", "Qt4-2", "Qt4-3",];

    ArecaceMonthLengths = [30, 29, 30, 30, 29, 30,
                           30, 29, 30, 30, 29, 30];

    ArecaceZodiac = ["The Engineer", "The Guardian",
                     "The Healer", "The Mother",
                     "The Musician", "The Jester",
                     "The Magician", "The Mercenary",
                     "The Hunter", "The Drifter",
                     "The Diplomat","The Philosopher"];
    
    ArecaceDates: string[];

    EarthMonthNames = ["Jan", "Feb", "Mar",
                       "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep",
                       "Oct", "Nov", "Dec"];
    
    EarthMonthLengths = [31, 29, 31, 30, 31, 30,
                         31, 31, 30, 31, 30, 31];

    EarthDates: string[];
    
    Missing = ["02-29", "04-29", "04-30", "05-30", "05-31",
    "07-30", "07-31", "08-30", "08-31", "10-31"];
    
    MissingPositions = [70, 130, 131, 161, 162,
                        222, 223, 253, 254, 315];
    
    constructor() {
        let earthDates = this.makeDates(this.EarthMonthLengths);
        earthDates = earthDates.splice(355, 365)
                               .concat(earthDates.splice(0, 355));
        this.EarthDates = earthDates;
        let arecaceDates = this.makeDates(this.ArecaceMonthLengths);
        for(let position of this.MissingPositions){
            arecaceDates.splice(position, 0, "NA");
        }
        this.ArecaceDates = arecaceDates;
    }

    makeDates(monthLength: number[]) {
        let Days = [];
        monthLength.forEach((month, i) => {
            Array(month).fill('').forEach((day, j) => {
                Days.push(`${this.quickFormat(i+1)}-${this.quickFormat(j+1)}`)
            });  
        })
        return(Days);
    }

    quickFormat(ind: number) {
        if(ind < 10) {
            return `0${ind}`;
        }
        return(ind);
    }

    arecacetoEarthConverter(QT: string, day: number) {
        const month = this.ArecaceMonthNames
                                    .findIndex(month => QT === month)+1;
        const dateCheck = `${this.quickFormat(month)}-${this.quickFormat(day)}`;
        const index = this.ArecaceDates
                                    .findIndex(date => dateCheck === date);
        return(this.EarthDates[index]);
    }

    earthtoArecaceConverter(month: number, day: number) {
        const dateCheck = `${this.quickFormat(month)}-${this.quickFormat(day)}`;
        const index = this.EarthDates
                                    .findIndex(date => dateCheck === date);
        const numericDate = this.ArecaceDates[index].split('-');
        return(`${this.ArecaceMonthNames[+numericDate[0]]} ${numericDate[1]}`)
    }
}

// export class QTData{
//     qt:string;
//     days:number;
//     zodiac:string;
// }
// Quartrits = [{qt:"Qt1-1", days:30, zodiac:"The Engineer"},
    //              {qt:"Qt1-2", days:29, zodiac:"The Guardian"},
    //              {qt:"Qt1-3", days:30, zodiac:"The Healer"},
    //              {qt:"Qt2-1", days:30, zodiac:"The Mother"},
    //              {qt:"Qt2-2", days:29, zodiac:"The Musician"},
    //              {qt:"Qt2-3", days:30, zodiac:"The Jester"},
    //              {qt:"Qt3-1", days:30, zodiac:"The Magician"},
    //              {qt:"Qt3-2", days:29, zodiac:"The Mercenary"},
    //              {qt:"Qt3-3", days:30, zodiac:"The Hunter"},
    //              {qt:"Qt4-1", days:30, zodiac:"The Drifter"},
    //              {qt:"Qt4-2", days:29, zodiac:"The Diplomat"},
    //              {qt:"Qt4-3", days:30, zodiac:"The Philosopher"}];

export class Birthdays {
    Name: string;
    Date: string;
}