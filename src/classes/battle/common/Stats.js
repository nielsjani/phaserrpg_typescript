var Classes;
(function (Classes) {
    class Stats {
        constructor(level, maxhealth, maxmana, attack, defense, speed) {
            this.level = level;
            this.maxhealth = maxhealth;
            this.currenthealth = maxhealth;
            this.maxmana = maxmana;
            this.currentmana = maxmana;
            this.attack = attack;
            this.defense = defense;
            this.speed = speed;
        }
        getPercentHealthRemaining() {
            return (this.currenthealth / this.maxhealth) * 100;
        }
    }
    Classes.Stats = Stats;
    class StatsBuilder {
        stats() {
            return this;
        }
        build() {
            return new Stats(this.level, this.maxhealth, this.maxmana, this.attack, this.defense, this.speed);
        }
        withLevel(value) {
            this.level = value;
            return this;
        }
        withMaxhealth(value) {
            this.maxhealth = value;
            return this;
        }
        withMaxmana(value) {
            this.maxmana = value;
            return this;
        }
        withAttack(value) {
            this.attack = value;
            return this;
        }
        withDefense(value) {
            this.defense = value;
            return this;
        }
        withSpeed(value) {
            this.speed = value;
            return this;
        }
    }
    Classes.StatsBuilder = StatsBuilder;
})(Classes || (Classes = {}));
//# sourceMappingURL=Stats.js.map