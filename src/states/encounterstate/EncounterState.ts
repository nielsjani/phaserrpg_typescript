///<reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="../../classes/util/Constants.ts"/>
///<reference path="../../classes/battle/player/Player.ts"/>
///<reference path="./EncounterStateMenuManager.ts"/>

namespace States {
    import Constants  = Classes.Util.Constants;
    import Player = Classes.Player;
    import Enemy = Classes.Enemy;
    import EncounterStateMenuManager = States.EncounterStateMenuManager;

    export class EncounterState extends Phaser.State {
        private possibleEnemies: Enemy[];
        private state: Phaser.State;
        player: Player;
        private encounterStateMenuManager: EncounterStateMenuManager;

        //TODO: display health/MP
        //TODO: information textbox with text that describes when something has happened
        //TODO: turn-based

        init(possibleEnemies: Enemy[], state: Phaser.State, player: Player) {
            this.possibleEnemies = possibleEnemies;
            this.state = state;
            this.player = player;

            this.add.sprite(200, 200, "player_backsprite");
            this.add.sprite(10, 10, this.possibleEnemies[0].getImageKey());
            this.add.sprite(290, 10, this.possibleEnemies[0].getImageKey());
            this.add.sprite(570, 10, this.possibleEnemies[0].getImageKey());
        }

        create() {
            this.encounterStateMenuManager = new EncounterStateMenuManager(this);
            this.encounterStateMenuManager.createBaseMenu(this.useSpecial, this.flee);
            this.encounterStateMenuManager.createAttacksMenu();
            this.encounterStateMenuManager.createItemPaginationButtons();
        }

        private useSpecial() {
            console.log("I'm special!");
        }

        private flee() {
            //TODO: encounterstate needs to know the map and tileset and x/y to return to
            this.game.state.start('LoadState', false, false, "mymap1", "MyTileset");
        }

        getPlayerItems(start: number, end: number) {
            return this.player.items.slice(start, end);
        }

        getAllPlayerItems() {
            return this.player.items;
        }
    }
}

