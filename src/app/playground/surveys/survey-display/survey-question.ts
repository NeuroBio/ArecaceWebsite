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
    Outcomes: string;
}

export class SurveyData {
    Questions: SurveyQuestion[];
    Results: object[][];
    Outcomes: SurveyOutcome[];
    MaxScores: object[];

    constructor(q: SurveyQuestion[], r: object[][], o: SurveyOutcome[],
                m: object[]) {
        this.Questions = q;
        this.Results = r;
        this.Outcomes = o;
        this.MaxScores = m;
    }
}