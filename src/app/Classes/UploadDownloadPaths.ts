export class FirebasePaths {
    bestiary = 'Bestiary';
    arc1 = 'Arc1Data';
    arc2 = 'Arc2Data';
    characters = 'CharacterBios';
    culture = 'CultureInfo';
    guilds = 'Guilds';
    maps = 'Maps';
    extras = 'MiscArt';
    scripts = 'Scripts';
    narratives = 'Narratives';
    source = 'SourceInfo';
    update = 'Inanity';
    surveys = 'Surveys';
    surveystats = 'SurveyStats';
    othersart = 'OthersArt';
    pixels = 'Pixels';
    SAs = 'SourceAffinities';
    sourceaffinity = 'SourceAffinities';
    notes = "LooseNotes"
}

export class Categories {
    source: string[] = ['Source', 'Esarians', 'Source Entities', 'Siphoid Technology'];
    culture: string[] = ['Groups', 'Religion and Myth', 'Misc.'];
    maps: string[] = ['Maps'];
}

export class Paths {
    //doc then images
    source: string[] =['SourceInfo','Refs'];
    culture: string[] =['CultureInfo','Refs'];
    maps: string[] = ['Maps','Refs'];
}

export class SiteMap {
    Worldbuilding =
        [['Introduction to Arecace', '/world/introduction'],
        ['Bestiary', '/world/bestiary'],
        ['Characters', '/world/characters'],
        ['Culture', '/world/culture'],
        ['The DIA and Guilds', '/world/guilds'],
        ['Siphoid/Source', '/world/source'],
        ['Maps', '/world/maps']]

    Story =
        [['Comic', '/comic'],
        ['Scripts', '/story/Scripts'],
        ['Narratives', '/story/Narratives']]

    Info =
        [['About the Author', '/about'],
        ['Cite Me', '/faq/copyright'],
        ['Fanart/Fanfic Policy', '/faq/copyright'],
        ['FAQ', '/faq'],
        ['Site Map (here)', '/sitemap']]

    Misc =
        [['Extras', '/extras'],
        ['Playground','/playground']]
}