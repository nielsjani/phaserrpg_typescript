export class Stats {
    level: number;
    maxhealth: number;
    currenthealth: number;
    maxmana: number;
    currentmana: number;
    attack: number;
    defense: number;
    speed: number;

    constructor(level: number, maxhealth: number, maxmana: number, attack: number, defense: number, speed: number) {
        this.level = level;
        this.maxhealth = maxhealth;
        this.currenthealth = maxhealth;
        this.maxmana = maxmana;
        this.currentmana = maxmana;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
    }

    //TODO: testable!
    getPercentHealthRemaining(): number {
        return (this.currenthealth / this.maxhealth) * 100;
    }

    heal(amount: number) {
        if(this.currenthealth + amount >= this.maxhealth) {
            this.currenthealth = this.maxhealth;
        } else {
            this.currenthealth+=amount;
        }
    }

    damage(amount: number) {
        if(this.currenthealth - amount <= 0) {
            this.currenthealth = 0;
        } else {
            this.currenthealth-=amount;
        }
    }
}

export class StatsBuilder {
    private level: number;
    private maxhealth: number;
    private maxmana: number;
    private attack: number;
    private defense: number;
    private speed: number;

    public stats() {
        return this;
    }

    public build() {
        return new Stats(this.level, this.maxhealth, this.maxmana, this.attack, this.defense, this.speed);
    }

    public withLevel(value: number) {
        this.level = value;
        return this;
    }

    public withMaxhealth(value: number) {
        this.maxhealth = value;
        return this;
    }

    public withMaxmana(value: number) {
        this.maxmana = value;
        return this;
    }

    public withAttack(value: number) {
        this.attack = value;
        return this;
    }

    public withDefense(value: number) {
        this.defense = value;
        return this;
    }

    public withSpeed(value: number) {
        this.speed = value;
        return this;
    }
}
