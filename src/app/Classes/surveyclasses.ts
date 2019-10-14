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
    TimeStampCreated?: string;
    TimeStampModified?: string;

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