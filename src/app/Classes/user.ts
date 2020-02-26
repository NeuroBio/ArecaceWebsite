import { CharacterMetaData } from './charactermetadata';
import { SA } from './SAclass';
import { Bookmark } from './Bookmark';
import { formatDate } from '@angular/common'
export class User {
    email: string;
    ID: number;
    userName: string;
    Admin: boolean;
    User: boolean;
    Narratives?: Bookmark[];
    Comics?: Bookmark[];
    Scripts?: Bookmark[];
    Surveys?: any[];
    Characters?: CharacterMetaData[];
    SAcalcs?: SA[];
    accountCreated: string;

    constructor(email: string, ID: number) {
        this.email = email;
        this.ID = ID;
        this.userName = 'defaultUserName_2.0';
        this.Admin = false;
        this.accountCreated = formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en');
    }
}
  