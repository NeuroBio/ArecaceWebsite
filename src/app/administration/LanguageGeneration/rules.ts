export class Alphabet {
    characters = ['a', 'b', 'd', 'e', 'g',
                  'i', 'k', 'l', 'm', 'o',
                  'p', 's', 'r', 't', 'v', 'z'];
    characterProbability = [.16, .20, .24, .31, .37,
                            .45, .51, .58, .65, .74,
                            .76, .81, .82, .88, .92, 1];
    vowels = ['a', 'i', 'o', 'e'];
    vowelProbability = [.4, .6, .8, 1];
    consonants = ['b', 'd', 'g', 'k', 'l',
                  'm', 'n', 'n', 'p', 'r',
                  's', 't', 'v', 'x', 'z'];
    nounEnd = ['a', 'i', 'o', 'e', 'r'];
    AdjEnd = ['x', 'v', 'g', 's', 'l', 't']
    AdjEndProbability = [.375, .75, .8125, .875, .9375, 1]
}

export class Word {
    Indativor: string;
    English: string;
    Type: string;
    Level: number;
    Core: string;
    Components: string;

    constructor(inda: string, eng: string, type: string,
                level: number, core: string, comp: string) {
        this.Indativor = inda;
        this.English = eng;
        this.Type = type;
        this.Level = level;
        this.Core = core;
        this.Components = comp;
    }
}

export class Nomadic {
    Alphabet = new Alphabet;

    makeWord(type: string, dictionary: Word[], length?: number) {
        if(length === undefined) {
            length = this.getWordLength(type);
        }
        let New = false;
        let Word: string[];
        let Core: string;
        
        while(!New){
            Word = this.getLetters(length);
            Word = this.typeFit(Word, type);
            Core = this.getCore(Word.slice(0), type);
            New = !dictionary.some(word => word.Core === Core); //if word in dictionary, toss it
        }

        return Word.join('');
    }


    private normDist(min, max, skew) { //https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) num = this.normDist(min, max, skew); // resample between 0 and 1 if out of range
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return num;
    }

    private getWordLength(type: string) {
        switch(type) {
            case 'Noun':
                return Math.floor(this.normDist(3, 9, 2));
            case 'Verb':
                return Math.floor(this.normDist(4, 9, 2));
            case 'Adjective':
                return Math.floor(this.normDist(3, 10, 2.5));
        }
    }

    private getLetters(length: number) {
        let Word = [];
        for(let i = 0; i < length; i++){
            if(i === 0) {
                Word.push(this.sample(this.Alphabet.characters, this.Alphabet.characterProbability));
            } else {
                const Vowel = this.Alphabet.vowels.indexOf(Word[i-1]) > -1;
                if(Vowel){
                    Word.push(this.getPostVowelLetter(Word[i-1], Word[i-2]));
                } else {
                    Word.push(this.getPostConsonantLetter(Word[i-1]));
                }    
            }
        }
        Word = this.preventOrphans(Word);
        return Word;
    }

    private getPostVowelLetter(lastLetter: string, lastLastLetter: string) {
        if(lastLetter === 'a') {
            if(Math.random() < .5){
                return 'e';
            }
        } else if(lastLetter === 'e') {
            if(lastLastLetter !== 'a') {
                return 'r';
            }
        } else if(lastLetter === 'i') {
    
            if(Math.random() < .6){
                return "a";
            } else if(lastLastLetter === 's') {
                this.Alphabet.consonants.splice(4, 1) //remove the l to prevent sil
            }
        }
        return this.sample(this.Alphabet.consonants);
    }

    private getPostConsonantLetter(lastLetter: string) {
        if(lastLetter === 'p') {
            return 'h';
        }  else if (lastLetter === 'g') {
            if(Math.random() < .75) {
                return 'r';
            }
        } else if (lastLetter === 's') {
            if(Math.random() < .35) {
                return 'k';
            }
        } else if(lastLetter === 'z') {
            if(Math.random() < .6) {
                return 'r';
            }
        }
        return this.sample(this.Alphabet.vowels, this.Alphabet.vowelProbability);
    }

    private preventOrphans(word: string[]) {
        if(word[word.length-1] === 'p') {
            word.push('h');
        } else if(word[word.length-1] === 'e'  && word[word.length-2] !== 'a') {
            word.push('r');
        }
        return word;
    }

    private typeFit(word: string[], type: string) {
        const lastLetter = word[word.length-1];
        switch(type) {
            case 'Noun':
                return this.fitNoun(word, lastLetter);
            case 'Verb':
                return this.fitVerb(word, lastLetter);
            case 'Adjective':
                return this.fitAdjetive(word, lastLetter);
        }
    }

    private fitNoun(word: string[], lastLetter: string) {
        const lastLastLetter = word[word.length-2];
        if( (lastLetter === 'r' && lastLastLetter !== 'e')
        || this.Alphabet.nounEnd.indexOf(lastLetter) === -1) {
            word.push(this.sample(['a', 'i', 'o']));
        }
        word = word.map(letter => {
            if(letter === 'x') {
                return 'kt';
            }
            return letter;
        });
        return word.join('').split('');
    }

    private fitVerb(word: string[], lastLetter: string) {
        if(lastLetter === 'a') {
            word.push(this.sample(['n', 'hin']));
        } else if(lastLetter === 'i') {
            word.push('n');
        } else if(lastLetter === 'o') {
            word.push(this.sample(['in', 'an']));
        } else {
            word.push(this.sample(['in', 'an', 'on']));
        }
        return word.join('').split('');
    }

    private fitAdjetive(word: string[], lastLetter: string) {
        if(this.Alphabet.AdjEnd.indexOf(lastLetter) === -1) {
            if(this.Alphabet.vowels.indexOf(lastLetter) > -1) { //vowel final letter
                word.push(this.sample(this.Alphabet.AdjEnd, this.Alphabet.AdjEndProbability));
            } else {
                word.push(this.sample(this.Alphabet.vowels, this.Alphabet.vowelProbability));
                word.push(this.sample(this.Alphabet.AdjEnd, this.Alphabet.AdjEndProbability));
            }
        }
        if(word.length > 2){// prevent word from ending in special word "like"/"dex"
            const test = [word[word.length - 1],
                          word[word.length - 2],
                          word[word.length - 3]].join('');
            if(test === 'dex') {
                word[word.length] = 'a';
            }
        }
        return word;
    }

    getCore (word: string[], type: string) {
        switch(type) {
            case 'Noun':
                return word.join('');
            case 'Adjective':
                return word.slice(0,-1).join('');
            case 'Verb':
                return word.splice(0,word.length-2).join('');
        }
    }

    private sample(options: any[], probability?: number[]) {
        //when probability is not declared, assume equal chance for all options
        if(probability === undefined){
            probability = [];
            const chance = 1/options.length;
            options.forEach((x, index) => { //x is not used!
                probability.push(chance * (index+1))
            })
            probability[probability.length-1] = 1;
        }else if(options.length !== probability.length) {
            console.error("Your sample inputs are of different lengths!");
        }

        const Choice = Math.random();
        for(let i = 0; i < probability.length; i++){
            if(Choice < probability[i]) {
                return options[i];
            }
        }
        console.error("Nothing was chosen during sampling!")
    }
}