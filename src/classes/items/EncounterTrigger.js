var Classes;
(function (Classes) {
    class EncounterTrigger {
        constructor(x, y, sprite, possibleEnemies, encounterRate, widthInTiles, heightInTiles) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.possibleEnemies = possibleEnemies;
            this.encounterRate = encounterRate;
            this.widthInTiles = widthInTiles;
            this.heightInTiles = heightInTiles;
            this.encounterPercentages = [1, 10, 25, 50, 100];
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.possibleEnemies = possibleEnemies;
            this.encounterRate = encounterRate;
            this.widthInTiles = widthInTiles;
            this.heightInTiles = heightInTiles;
        }
        getCustomProperties() {
            return {
                collides: false,
                handleOverlap: this.handleOverlap,
                handleNoOverlap: this.handleNoOverlap,
                startEncounter: this.startEncounter,
                possibleEnemies: this.possibleEnemies,
                encounterRate: this.encounterRate,
                encounterPercentages: this.encounterPercentages,
                timeLoop: this.timeLoop,
                state: this.state
            };
        }
        startEncounter() {
            var randomBetweenZeroAndHundred = Math.floor(Math.random() * 100) + 1;
            if (this.encounterPercentages[this.encounterRate] < randomBetweenZeroAndHundred) {
                this.state.game.state.start("EncounterState", true, false, this.possibleEnemies, this.state, this.state.player);
            }
        }
        handleNoOverlap(state) {
            if (this.timeLoop) {
                console.log("Left encounter tile");
                state.game.time.events.remove(this.timeLoop);
                this.timeLoop = undefined;
            }
        }
        handleOverlap(state) {
            console.log("Entered encounter tile");
            this.state = state;
            if (!this.timeLoop) {
                this.timeLoop = state.game.time.events.loop(Phaser.Timer.SECOND * 5, this.startEncounter, this);
            }
        }
    }
    Classes.EncounterTrigger = EncounterTrigger;
})(Classes || (Classes = {}));
//# sourceMappingURL=EncounterTrigger.js.map