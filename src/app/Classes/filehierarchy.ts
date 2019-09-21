export class Hier {
    Terminal: boolean;
    Path: string;
    NextTypeFinal: boolean;
    constructor(a:boolean, b:string, c:boolean){
        this.Terminal=a;
        this.Path=b;
        this.NextTypeFinal=c;
    }
}

export class FileHierarchy {
    bestiary: Hier = new Hier(true, 'Bestiary', true);
    arc1: Hier = new Hier(true, 'Arc1Data', true );
    arc2: Hier = new Hier(true, 'Arc2Data', true );
    characters: Hier = new Hier(true, 'CharacterBios', true);
    culture: Hier = new Hier(true, 'CultureInfo', true);
    guilds: Hier = new Hier(true, 'Guilds', true);
    maps: Hier = new Hier(true, 'Maps', true);
    extras: Hier = new Hier(true, 'MiscArt', true);
    scripts: Hier = new Hier(true, 'Scripts', true);
    narratives: Hier = new Hier(true, 'Narratives', true);
    source: Hier = new Hier(true, 'SourceInfo', true);
    update: Hier = new Hier(true, 'Inanity', true);
}