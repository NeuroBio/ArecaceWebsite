import { DateInfo } from 'src/app/Classes/datedata';

export class countryData{
    id:string;
    terr:string[];
}

export class EthnicityData{
    id:string;
    hex:string;
}

export class UploadCharacterDrops {
    class:string[]=["Source Magician","Sourceless", "Esarian-Red",
    "Esarian-Blue", "Esarian-Green", "Wolf Type", "Midmorph"];

    countries:countryData[] =[{
        id:"Cathesten", terr:["East Port", "The Tri-Cities", "The Nothern Wastes", "The Southern Wastes",
        "The South Plains", "West Central", "West North", "West South", "Old Lithops", "Old Calanthe"]},
        {id:"Eriasten", terr:["Opunti", "Delonix", "The Refugee Camps"]}, 
        {id:"Escholzian", terr:["The Chloris Plains", "The Dead Volcanoes", "East Greya", "West Greya",
                            "The Mertensian Peaks", "The Winter Rainforest"]},       
        {id:"Salixen", terr:["Alliar", "Allium", "Anthus", "Tanacet", "Urtica"]}
    ];     
    
    Months: number[]
    
    Quartrits: string[]

    Zodiacs: string[]

    Ethnicity:EthnicityData[]=[{id:"Hnd", hex:"#513d1e"},
                                {id:"Hnd-s", hex:"#997757"},
                                {id:"Hns-d", hex:"#a88961"},
                                {id:"Hns", hex:"#ccae8a"},
                                {id:"Hnt", hex:"#dbbf99"},
                                {id:"Hnn", hex:"#e2d3a3"},
                                {id:"Hnn-r", hex:"#efe2bf"},
                                {id:"Hnr", hex:"#f2e7da"},
                                {id:"Mixed", hex:"#ffffff"}];

    Era:string[]=["DE", "pDE"];

    SAbilities:string[]=["Augment","Blank", "Blaze", "Breaker", "Chaos",
                          "Communion", "Compress",  "Connection", "Disrupt",
                          "Energy Gathering", "Epitax", "Ghost Hack", "Growth",
                          "Integrate", "Maintain", "Metamorph", "Rebuild",
                          "Refine", "Soothe", "Stagnate"]
    constructor() {
        const Dates = new DateInfo();
        this.Months = Dates.ArecaceMonthLengths;
        this.Quartrits = Dates.ArecaceMonthNames;
        this.Zodiacs = Dates.ArecaceZodiac;
    }
}
