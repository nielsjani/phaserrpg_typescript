///<reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="states/LoadState.ts"/>
///<reference path="states/GameState.ts"/>
///<reference path="states/encounterstate/EncounterState.ts"/>
class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);
        this.state.add("LoadState", States.LoadState, false);
        this.state.add("GameState", States.GameState, false);
        this.state.add("EncounterState", States.EncounterState, false);
        this.state.start('LoadState', false, false, "mymap1", "MyTileset");
    }
}

new Game();