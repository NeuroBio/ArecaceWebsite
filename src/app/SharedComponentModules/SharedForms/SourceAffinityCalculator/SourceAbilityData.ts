export class AbilityData {
    AugmentSpeed = new Ability('Potentiation', 4, 5, 5, 6);
    AugmentStrength = new Ability('Potentiation', 4, 5, 5, 6);
    AugmentEndurance = new Ability('Potentiation', 2, 4, 4, 5);
    Blank = new Ability('Dispersion', 6, 6, 6, 7);
    Blaze = new Ability('AtomicEnergyManipulation', 3, 6, 6, 7);
    Breaker = new Ability('Dispersion', 7, 7, 7, 9);
    Chaos = new Ability('Dispersion', 6, 5, 5, 6);
    Communion = new Ability('ConfigurationManipulation', 3, 4, 4, 6);
    Compress = new Ability('Condensation', 3, 5, 5, 7);
    Connection = new Ability('ConfigurationManipulation', 10, 20, 20, 20);
    Disrupt = new Ability('Redirection', 9, 13, 9, 19);
    EnergyGathering = new Ability('Gathering', 1, 4, 4, 4);
    Epitax = new Ability('Construction', 6, 7, 7, 7);
    GhostHackSpike = new Ability('ElectricalManipulation', 2, 4, 4, 5);
    GhostHackSignal = new Ability('ElectricalManipulation', 3, 3, 4, 5);
    GhostHackSourceWyrm = new Ability('ElectricalManipulation', 5, 10, 10, 10);
    Growth = new Ability('Potentiation', 4, 7, 7, 7);
    Integrate = new Ability('Reconstruction', 2, 0, 0, 0);
    Maintain = new Ability('Potentiation', 0, 0, 0, 0);
    Metamorph = new Ability('Reconstruction', 15, 28, 29, 28);
    Rebuild = new Ability('Construction', 4, 8, 8, 10);
    Refine = new Ability('Construction', 4, 3, 4, 4);
    Soothe = new Ability('ConfigurationManipulation', 2, 4, 4, 5);
    Stagnate = new Ability('AtomicEnergyManipulation', 3, 7, 7, 8);
    Shatter = new Ability('AtomicEnergyManipulation', 7, 9, 10, 9);
    Imprint = new Ability('ConfigurationManipulation', 2, 0, 0, 0);
    Channal = new Ability('Condensation', 27, 24, 24, 25);
}

export class Ability {
    Class: string;
    Costs: number[];

    constructor(cla: string, low: number, mid: number,
                high: number, top: number) {
        this.Class = cla;
        this.Costs = [low, mid, high, top];
    }
}

export class AbilityMastery {
    Ability: string;
    Mastery: number;

    constructor(ability: string, mastery: number) {
        this.Ability = ability;
        this.Mastery = mastery;
    }
}

export class RelatednessMatrix {
    AtomicEnergyManipulation = new Relatedness(.75, 1.25, 1.25, 1, 1.5, 1, .5, 1.25, 1.25, 1.25);
    Condensation = new Relatedness(1.25, 0.75, 1.25, 1.25, 2, 1.25, 0.5, 1.25, 1.25, 1.25);
    ConfigurationManipulation = new Relatedness(1.25, 1.25, 0.75, 1.25, 1.5, 1.25, 0.5, 1.25, 1.25, 1.25);
    Construction = new Relatedness(1, 1.25, 1.25, 0.75, 1.5, 1.25, 0.5, 1.25, 1.25, 1.25);
    Dispersion = new Relatedness(1.5, 2, 1.5, 1.5, 0.75, 1.5, 2, 1.5, 1.5, 1.25);
    ElectricalManipulation = new Relatedness(1, 1.25, 1.25, 1.25, 1.5, 0.75, 0.5, 1.25, 1.25, 1.25);
    Gathering = new Relatedness(0.5, 0.5, 0.5, 0.5, 2, 0.5, 0.75, 0.5, 0.5, 1.25);
    Potentiation = new Relatedness(1.25, 1.25, 1.25, 1.25, 1.5, 1.25, 0.5, 0.75, 1.25, 1.25);
    Reconstruction = new Relatedness(1.25, 1.25, 1.25, 1.25, 1.5, 1.25, 0.5, 1.25, 0.75, 1.25);
    Redirection = new Relatedness(1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25);
}

export class Relatedness {
    AtomicEnergyManipulation: number;
    Condensation: number;
    ConfigurationManipulation: number;
    Construction: number;
    Dispersion: number;
    ElectricalManipulation: number;
    Gathering: number;
    Potentiation: number;
    Reconstruction: number;
    Redirection: number;

    constructor(a: number, b: number, c: number, d: number,
                e: number, f: number, g: number, h: number,
                i: number, j: number) {
        this.AtomicEnergyManipulation = a;
        this.Condensation = b;
        this.ConfigurationManipulation = c;
        this.Construction = d;
        this.Dispersion = e;
        this.ElectricalManipulation = f;
        this.Gathering = g;
        this.Potentiation = h;
        this.Reconstruction = i;
        this.Redirection = j;
    }
}

export class AbilityNames {
    Names = ['Augment-Speed', 'Augment-Strength', 'Augment-Endurance',
    'Blank', 'Blaze', 'Breaker', 'Chaos', 'Communion', 'Compress',
    'Connection', 'Disrupt', 'Energy Gathering', 'Epitax',
    'Ghost Hack-Spike', 'Ghost Hack-Signal', 'Ghost Hack-Source Wyrm',
    'Growth', 'Integrate', 'Maintain', 'Metamorph', 'Rebuild',
    'Refine', 'Soothe', 'Stagnate', 'Shatter', 'Imprint', 'Channal'];
}