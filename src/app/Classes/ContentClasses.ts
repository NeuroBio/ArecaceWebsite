import { AbilityMastery } from '../SharedComponentModules/SharedForms/SourceAffinityCalculator/SourceAbilityData';
import { formatDate } from '@angular/common';

export class GeneralMetaData {
    ID: string;
    Category: string;
    Topic: string;
    Caption: string;
    FullText: string;
    Links: string[];
}

export class BeastMetaData {
    Name: string;
    ID: string;
    Phylo: string;
    Region: string;
    Biome: string;
    Links: string[];
    AltText: string;
}

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

export class ChapterMetaData {
    Name: string;
    ID: number;
    Index: number;
    Arc: string;
    NumPages: number;
    Links: string[];
    Message: string;
}

export class CharacterMetaData {
    ID = '';
    FirstName = '';
    LastName = '';
    SMClass = 'Source Magician';
    Occupation = '';
    Country = 'Escholzian';
    Territory = 'The Chloris Plains';
    City = '';
    Ethnicity1 = 'Hns';
    Ethnicity2 = 'Hns';
    Age = 0;
    Year = 283;
    Era = 'DE';
    Qt = 'Qt1-1';
    Day = 1;
    Zodiac = 'The Engineer';
    Ft = 0;
    Inch = 0;
    Cm = 0;
    DistinguishingMarks = '';
    Personality = '';
    Philosophy = '';
    MotivationsGoals = '';
    Strengths = '';
    Weaknesses = '';
    SourceAbilities: string;
    Unique: string;
    SourceAbilitiesFormatted: string;
    Relations: string;
    RelationsFormatted: string;
    BriefBackground = '';
    FullBackground = '';
    Links: string[] = [];
    ReferenceIDs: string[] = [];
    References: any[] = [];
    DisplayName?: string;
}

export class CRUDdata {
    Abort: boolean;
    AbortMessage: string;
    MetaData: any;
    NewImageLinks: string[];
    ImageBlobs: any[];
    OldImageLinks: string[];
    NewTextPath: string;
    TextBlob: any;
    OldTextPath: string;

    constructor(
        abort: boolean, abortMessage: string = '', meta: any = '',
        newImgLinks: string[] = [], imageBlobs: any[] = [],
        oldImgLinks: string[] = [], newTextPath?: string,
        textBlob?: any, oldTextpath?: string
    ) {

        this.Abort = abort;
        this.AbortMessage = abortMessage;
        this.MetaData = meta != '' ? meta : undefined;
        this.NewImageLinks = newImgLinks;
        this.ImageBlobs = imageBlobs;
        this.OldImageLinks = oldImgLinks;
        this.NewTextPath = newTextPath;
        this.TextBlob = textBlob;
        this.OldTextPath = oldTextpath;
    }
}

export class ExtrasMetaData {
    Name: string;
    ID: string;
    Links: string[];
    Description: string;
    Date: string;
}

export class GuildMetaData {
    ID: string;
    GuildName: string;
    Master: string;
    Founded: number;
    Host: string;
    Description: string;
    History: string;
    Links: string[];
    AltText: string;
}

export class LooseNotesMetaData {
    Title: string;
    ShortTitle: string;
    Text: string;
    ID: string;
    Created: string;
    Modified: string;
}

export class OthersArt {
    Name: string;
    ID: string;
    Links: string[];
    Date: number;
    Artist: string;
    ArtistLink: string;
    Allowed: boolean;
}

export class PostData {
    ID: string;
    Body: string;
    Poster: string;
    Date: string;
    Time: string;
    Links?: string[];
    AltText: string;
    Edited: boolean;
}

export class SA {
    Build: AbilityMastery[];
    ConnectionGenes: number;
    Cost: number;
    EsarianGenes: number;
    ID: string;
    Name: string;
    Rank: string;
    DisplayName?: string;
}

export class StoryMetaData {
    ID: string;
    Type: string;
    Series: string;
    Title: string;
    Section: number;
    Synopsis: string;
    WordCount: number;
    StoryLink: string;
}

export class SurveyQuestion {
    Question: string;
    Answers: string[];

    constructor(q: string, a: string[]) {
        this.Question = q;
        this.Answers = a;
    }
}

export class SurveyOutcome {
    Name: string;
    Text: string;
    Link?: string;
    LinkName?: string;
}

export class SurveyData {
    Questions: SurveyQuestion[];
    Results: object[][];
    Outcomes: SurveyOutcome[];
    MaxScores: any;
    ID: string;
    Name: string;

    constructor(
        q: SurveyQuestion[], r: object[][], o: SurveyOutcome[],
        m: any, id: string, name: string
    ) {
        this.Questions = q;
        this.Results = r;
        this.Outcomes = o;
        this.MaxScores = m;
        this.ID = id;
        this.Name = name;
    }
}

export class User {
    email: string;
    ID: number;
    userName: string;
    Admin: boolean;
    User: boolean;
    Mod: boolean;
    Narratives?: any[];
    Comics?: any[];
    Scripts?: any[];
    Favorites?: any[];
    SurveyResults?: any[];
    FanCharacters?: CharacterMetaData[];
    SAcalculations?: SA[];
    accountCreated: string;
    showPreview: boolean;

    constructor(email: string, ID: number) {
        this.email = email;
        this.ID = ID;
        this.userName = 'defaultUserName_2.0';
        this.Admin = false;
        this.Mod = false;
        this.User = true;
        this.accountCreated = formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en');
    }
}
