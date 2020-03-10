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
    arc1 = new PathInfo('Arc1Data', '/comics', ['Name', 'NumPages']);
    arc2 = new PathInfo('Arc2Data', '/comics', ['Name', 'NumPages']);
    bestiary = new PathInfo('Bestiary', '/world/bestiary', ['Name']);
    characters = new PathInfo('CharacterBios', '/world/characters', ['FirstName', 'LastName']);
    culture = new PathInfo('CultureInfo', '/world/culture', ['Topic']);
    extras = new PathInfo('MiscArt', '/extras', ['Name']);
    guilds = new PathInfo('Guilds', '/world/guilds', ['Guild Name']);
    maps = new PathInfo('Maps', '/world/maps', ['Topic']);
    narratives = new PathInfo('Narratives', '/story/Narratives', ['Series', 'Title']);
    notes = new PathInfo('LooseNotes', '/playground/notes', ['ShortTitle']);
    othersart = new PathInfo('OthersArt', '/playground/otherart',[], true)
    pixels = new PathInfo('Pixels', '/playground/otherart', [], true);
    scripts = new PathInfo('Scripts', '/story/Scripts', ['Series', 'Title']);
    sourceaffinity = new PathInfo('SourceAffinities', '/playground/calc/sourceaffinity', ['ID']);
    source = new PathInfo('SourceInfo', '/world/source', ['Topic']);
    surveys = new PathInfo('Surveys', '/playground/surveys', ['Name']);
    surveystats = new PathInfo('SurveyStats', '', [], true);
    update = new PathInfo('Inanity', '', [], true);
    nomadic = new PathInfo('Nomadic', '/playground/nomadic/dictionary', ['Indativor']);
    website = new PathInfo('WebsiteText', '', [], true);
}

export class PathInfo {
    Fire: string;
    Local: string;
    NameTokens: string[];
    NewestExclude: boolean

    constructor(fire: string, local: string, nameTokens: string[],
        exclude: boolean = false) {
        this.Fire = fire;
        this.Local = local;
        this.NameTokens = nameTokens;
        this.NewestExclude = exclude;
    }
} 

export class UserDataNameTokens {
    FanCharacters = ['FirstName', 'LastName'];
    SurveyResults = ['Name', 'UploadTimeShort'];
    SAcalculations = ['ID'];
}