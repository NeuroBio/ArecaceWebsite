export class QTData{
    qt:string;
    days:number;
    zodiac:string;
}
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
    
    Quartrits:QTData[]=[{qt:"Qt1-1", days:30, zodiac:"The Engineer"},
                        {qt:"Qt1-2", days:29, zodiac:"The Guardian"},
                        {qt:"Qt1-3", days:30, zodiac:"The Healer"},
                        {qt:"Qt2-1", days:30, zodiac:"The Mother"},
                        {qt:"Qt2-2", days:29, zodiac:"The Musician"},
                        {qt:"Qt2-3", days:30, zodiac:"The Jester"},
                        {qt:"Qt3-1", days:30, zodiac:"The Magician"},
                        {qt:"Qt3-2", days:29, zodiac:"The Mercenary"},
                        {qt:"Qt3-3", days:30, zodiac:"The Hunter"},
                        {qt:"Qt4-1", days:30, zodiac:"The Drifter"},
                        {qt:"Qt4-2", days:29, zodiac:"The Diplomat"},
                        {qt:"Qt4-3", days:30, zodiac:"The Philosopher"}];

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
}

    