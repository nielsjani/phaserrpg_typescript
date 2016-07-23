///<reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="states/LoadState.ts"/>
///<reference path="states/GameState.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//import PhaserGame = Phaser.Game;
//import States2 = States;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
        this.state.add("LoadState", States.LoadState, false);
        this.state.add("GameState", States.GameState, false);
        this.state.start('LoadState', false, false, "map1", "pokemon1");
    }
    return Game;
})(Phaser.Game);
new Game();
//# sourceMappingURL=index.js.map