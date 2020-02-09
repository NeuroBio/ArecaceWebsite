export class User {
    email: string;
    ID: number;
    userName: string;
    Admin: boolean;
    User: boolean;
    Narrative: string;
    Comic: string;
    Script: string;

    constructor(email: string, ID: number) {
        this.email = email;
        this.ID = ID;
        this.userName = 'defaultUserName_2.0';
        this.Admin = false;
        this.Narrative = '';
        this.Script = '';
        this.Comic = '';
    }
}
  