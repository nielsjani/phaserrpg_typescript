///<reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="states/LoadState.ts"/>
///<reference path="states/GameState.ts"/>
///<reference path="states/encounterstate/EncounterState.ts"/>
import {LoadState} from "./states/LoadState";
import {GameState} from "./states/GameState";
import {EncounterState} from "./states/encounterstate/EncounterState";
class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);
        this.state.add("LoadState", LoadState, false);
        this.state.add("GameState", GameState, false);
        this.state.add("EncounterState", EncounterState, false);
        this.state.start('LoadState', false, false, "mymap1", "MyTileset");
    }
}

new Game();