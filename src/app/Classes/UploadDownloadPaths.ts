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
    arc1 = new PathInfo('Arc 1 Comic', 'Arc1Data', '/comics', ['Name', 'NumPages']);
    arc2 = new PathInfo('Arc 2 Comic', 'Arc2Data', '/comics', ['Name', 'NumPages']);
    bestiary = new PathInfo('Bestiary', 'Bestiary', '/world/bestiary', ['Name']);
    characters = new PathInfo('Character Bio', 'CharacterBios', '/world/characters', ['FirstName', 'LastName']);
    culture = new PathInfo('Culture Info', 'CultureInfo', '/world/culture', ['Topic']);
    extras = new PathInfo('Extra Art', 'MiscArt', '/extras', ['Name']);
    guilds = new PathInfo('Guild', 'Guilds', '/world/guilds', ['Guild Name']);
    maps = new PathInfo('Map', 'Maps', '/world/maps', ['Topic']);
    narratives = new PathInfo('Story', 'Narratives', '/story/Narratives', ['Series', 'Title'], 'Series');
    notes = new PathInfo('Writing Note','LooseNotes', '/playground/notes', ['ShortTitle']);
    othersart = new PathInfo('Other\'s Art', 'OthersArt', '/playground/otherart',[], undefined, true)
    pixels = new PathInfo('Other\'s Pixel', 'Pixels', '/playground/otherart', [], undefined, true);
    scripts = new PathInfo('Comic Script', 'Scripts', '/story/Scripts', ['Series', 'Title'], 'Series');
    sourceaffinity = new PathInfo('SA Data', 'SourceAffinities', '/playground/calc/sourceaffinity', ['ID']);
    source = new PathInfo('Source/Siphoid Info','SourceInfo', '/world/source', ['Topic']);
    surveys = new PathInfo('Survey', 'Surveys', '/playground/surveys', ['Name']);
    surveystats = new PathInfo('Survey Stats', 'SurveyStats', '', [], undefined,  true);
    update = new PathInfo('Update', 'Inanity', '', [], undefined, true);
    nomadic = new PathInfo('Nomadic Word', 'Nomadic', '/playground/nomadic/dictionary', ['Indativor']);
    website = new PathInfo('Website Text', 'WebsiteText', '', [], undefined, true);
}

export class PathInfo {
    Type: string;
    Fire: string;
    Local: string;
    ExtraPath: string;
    NameTokens: string[];
    NewestExclude: boolean

    constructor(type: string, fire: string, local: string, nameTokens: string[],
        extraPath: string = undefined, exclude: boolean = false) {
        this.Type = type;
        this.Fire = fire;
        this.Local = local;
        this.ExtraPath = extraPath;
        this.NameTokens = nameTokens;
        this.NewestExclude = exclude;
    }
} 

export class UserDataNameTokens {
    FanCharacters = ['FirstName', 'LastName'];
    SurveyResults = ['Name', 'UploadTimeShort'];
    SAcalculations = ['ID'];
}