import { AbilityMastery } from '../SharedComponentModules/SharedForms/SourceAffinityCalculator/SourceAbilityData';
import { formatDate } from '@angular/common'
import { SliderService } from 'src/app/SharedComponentModules/slider/slider.service';


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
    ID: string = '';
    FirstName: string = '';
    LastName: string = '';    
    SMClass: string = 'Source Magician';
    Occupation: string = '';
    Country: string = 'Escholzian';
    Territory: string = 'The Chloris Plains';
    City: string = '';
    Ethnicity1: string = 'Hns';
    Ethnicity2: string = 'Hns';
    Age: number = 0;
    Year: number = 283;
    Era: string ="DE";
    Qt: string = 'Qt1-1';
    Day: number = 1;
    Zodiac: string = 'The Engineer';
    Ft: number = 0;
    Inch: number = 0;
    Cm: number = 0;
    DistinguishingMarks: string = '';
    Personality: string = '';
    Philosophy: string = '';
    MotivationsGoals: string = '';
    Strengths: string = '';
    Weaknesses: string = '';
    SourceAbilities: string;
    Unique: string;
    SourceAbilitiesFormatted:string;
    Relations: string;
    RelationsFormatted: string;
    BriefBackground: string = '';
    FullBackground: string = '';
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

    constructor(abort: boolean, abortMessage: string = '', meta: any = undefined,
                newImgLinks: string[] = [], imageBlobs: any[] = [],
                oldImgLinks: string[] = [], newTextPath: string = undefined,
                textBlob: any = undefined, oldTextpath: string = undefined) {

        this.Abort = abort;
        this.AbortMessage = abortMessage;
        this.MetaData = meta;
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

    constructor(q:string, a: string[]) {
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

    constructor(q: SurveyQuestion[], r: object[][], o: SurveyOutcome[],
                m: any, id: string, name: string) {
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
    Narratives?: Bookmark[];
    Comics?: Bookmark[];
    Scripts?: Bookmark[];
    Favorites?: Bookmark[];
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
        this.accountCreated = formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en');
    }
}
  