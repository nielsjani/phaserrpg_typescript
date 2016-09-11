///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace States {
    import TextDisplay = Classes.TextDisplay;
    import Player = Classes.Player;

    export class EncounterState extends Phaser.State {
        private possibleEnemies: string[];
        private state: Phaser.State;
        private player: Player;

        init(possibleEnemies: string[], state: Phaser.State, player: Player) {
            this.possibleEnemies = possibleEnemies;
            this.state = state;
            this.player = player;
        }


        create() {
            //this.add.existing(this.player);
        }

        update() {

        }
    }
}

