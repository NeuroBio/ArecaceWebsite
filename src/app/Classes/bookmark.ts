export class Bookmark {
    Link: string;
    UploadTime: string;
    Name: string;

    constructor(link: string, time: string, name: string) {
        this.Link = link;
        this.UploadTime = time;
        this.Name = name;
    }
}