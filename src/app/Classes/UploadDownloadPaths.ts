export class ReferenceCategories {
    source: string[] = ['Source', 'Esarians', 'Source Entities', 'Siphoid Technology'];
    culture: string[] = ['Groups', 'Religion and Myth', 'Misc.'];
    maps: string[] = ['Maps'];
}

export class SiteMap {
    PathInfo = new AllPathInfo();

    Worldbuilding =
        [['Introduction to Arecace', '/world/introduction'],
        ['Bestiary',  this.PathInfo.bestiary.Local],
        ['Characters', this.PathInfo.characters.Local],
        ['Culture', this.PathInfo.culture.Local],
        ['The DIA and Guilds', this.PathInfo.guilds.Local],
        ['Siphoid/Source', this.PathInfo.source.Local],
        ['Maps', this.PathInfo.maps.Local],
        ['Nomadic Dictionary'], this.PathInfo.nomadic.Local]

    Story =
        [['Comic', this.PathInfo.arc1.Local],
        ['Scripts', this.PathInfo.scripts.Local],
        ['Narratives', this.PathInfo.narratives.Local]]

    Info =
        [['About the Author', '/about'],
        ['Cite Me', '/faq/copyright'],
        ['Fanart/Fanfic Policy', '/faq/copyright'],
        ['FAQ', '/faq'],
        ['Site Map (here)', '/sitemap']]
    Interactive =
        [['Surveys', this.PathInfo.surveys.Local],
        ['Calculators', '/playground/calc']]
    'Misc.' =
        [['Extras', this.PathInfo.extras.Local],
        ['Playground', '/playground'],
        ['Writer\'s Notes', this.PathInfo.notes.Local],
        ['Other\'s Art', this.PathInfo.othersart.Local]]
}

export class LocalPaths {
    extras: '/extras'
    Narratives: '/story/Narratives'

}

export class AllPathInfo {
    arc1 = new PathInfo('Arc1Data', '/comics', []);
    arc2 = new PathInfo('Arc2Data', '/comics', []);
    bestiary = new PathInfo('Bestiary', '/world/bestiary', []);
    characters = new PathInfo('CharacterBios', '/world/characters', []);
    culture = new PathInfo('CultureInfo', '/world/culture', []);
    extras = new PathInfo('MiscArt', '/extras', []);
    guilds = new PathInfo('Guilds', '/world/guilds', []);
    maps = new PathInfo('Maps', '/world/maps', []);
    narratives = new PathInfo('Narratives', '/story/Narratives', []);
    notes = new PathInfo('LooseNotes', '/playground/notes', []);
    othersart = new PathInfo('OthersArt', '/playground/otherart',[])
    pixels = new PathInfo('Pixels', '/playground/otherart', []);
    scripts = new PathInfo('Scripts', '/story/Scripts', []);
    sourceaffinity = new PathInfo('SourceAffinities', '/playground/calc/sourceaffinity', []);
    source = new PathInfo('SourceInfo', '/world/source', []);
    surveys = new PathInfo('Surveys', '/playground/surveys', []);
    surveystats = new PathInfo('SurveyStats', '', []);
    update = new PathInfo('Inanity', '', []);
    nomadic = new PathInfo('Nomadic', '/playground/nomadic/dictionary', [], true);
    website = new PathInfo('WebsiteText', '', [], true);
}

export class PathInfo {
    Fire: string;
    Local: string;
    NameTokens: string[];
    SpecialUpload: boolean;

    constructor(fire: string, local: string, nameTokens: string[], special: boolean = false) {
        this.Fire = fire;
        this.Local = local;
        this.NameTokens = nameTokens;
        this.SpecialUpload = special;
    }
} 

export class UserDataNameTokens {
    FanCharacters = ['FirstName', 'LastName'];
    SurveyResults = ['Name', 'UploadTimeShort'];
    SAcalculations = ['ID'];
}