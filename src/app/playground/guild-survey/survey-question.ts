export class SurveyQuestion {
    Question: string;
    Answers: string[];

    constructor(q:string, a: string[]) {
        this.Question = q;
        this.Answers = a;
    }
}