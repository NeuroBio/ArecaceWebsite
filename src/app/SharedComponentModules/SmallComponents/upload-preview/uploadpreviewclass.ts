export class UploadPreviewInfo {
    Name: string;
    ImgUrl: string;
    Loading: boolean;
    Generate?: boolean;

    constructor(name: string, imgUrl: string, loading: boolean, generate?: boolean) {
        this.Name = name;
        this.ImgUrl = imgUrl;
        this.Loading = loading;
        this.Generate = generate;
    }
}

export class ImageSettings {
    MaxHeight: number;
    MaxWidth: number;
    MaxSize: number;
    MaxSizeRead: string;

    constructor(MH: number, MW: number, MS: number, MSread: string) {
        this.MaxHeight = MH;
        this.MaxWidth = MW;
        this.MaxSize = MS;
        this.MaxSizeRead = MSread;
    
    }
}

export class UploadPreviewSettings {
    main: ImageSettings;
    thumb: ImageSettings;
    
    constructor(settings: {}[]) {
        this.main = new ImageSettings(settings[0][0],settings[0][1],
            this.converttoBytes(settings[0][2]), settings[0][2]);
        this.thumb = new ImageSettings(settings[1][0],settings[1][1],
            this.converttoBytes(settings[1][2]), settings[1][2]);
    }

    private converttoBytes(readable: string) {
        if(readable) {
            const Measures = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let num = +readable.match(/\d/g);
            const measure = readable.match(/\w/g).toString();
            const multiply = Measures.findIndex(x => x===measure) + 1;
            for(let i = 0; i < multiply; i++) {
                num = num*1024;
            }
            return num;
        } else {
            return undefined;
        }
    }

}