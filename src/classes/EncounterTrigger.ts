///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace Classes {
    import GameState = States.GameState;
    export class EncounterTrigger implements Classes.Item {

        private encounterPercentages:number[] = [1, 10, 25, 50, 100];
        private timeLoop: Phaser.TimerEvent;
        private state: GameState;

        constructor(public x:number, public y:number, public sprite:string, public possibleEnemies:string[], public encounterRate:number) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.possibleEnemies = possibleEnemies;
            this.encounterRate = encounterRate;
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
            }
        }

        startEncounter():void {
            var randomBetweenZeroAndHundred:number = Math.floor(Math.random() * 100) + 1;
            if(this.encounterPercentages[this.encounterRate] < randomBetweenZeroAndHundred) {
                this.state.game.state.start("EncounterState", true, false, this.possibleEnemies, this.state, this.state.player);
            }
        }

        handleNoOverlap(state:GameState) {
            if(this.timeLoop) {
                state.game.time.events.remove(this.timeLoop);
                this.timeLoop = undefined;
            }
        }

        handleOverlap(state:GameState) {
            this.state = state;
            if(!this.timeLoop) {
                this.timeLoop = state.game.time.events.loop(Phaser.Timer.SECOND * 5, this.startEncounter, this);
            }
        }
    }
}