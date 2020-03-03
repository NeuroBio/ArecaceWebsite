export class SourceAbilities {
    Ability:string;
    Known:boolean;
}

export class Relations {
    RelationName: string;
    Relationship: string;
}

export class MakeThumbInfo {
    Name: string;
    ImgUrl: string;
    Loading: boolean;
    Generate?: boolean

    constructor(name: string, imgUrl: string, loading: boolean, generate?: boolean) {
        this.Name = name;
        this.ImgUrl = imgUrl;
        this.Loading = loading;
        this.Generate = generate;
    }
}