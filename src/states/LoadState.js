///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var States;
(function (States) {
    var LoadState = (function (_super) {
        __extends(LoadState, _super);
        function LoadState() {
            _super.apply(this, arguments);
        }
        LoadState.prototype.init = function (map, tileset) {
            this.map = map;
            this.tileset = tileset;
        };
        LoadState.prototype.preload = function () {
            this.load.tilemap("map1", "images/maps/map1.json", null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map2", "images/maps/map2.json", null, Phaser.Tilemap.TILED_JSON);
            this.load.image("pokemon1", "images/tilesets/tileset1.png");
            this.load.image("tileset1", "images/tilesets/tileset1.png");
            this.load.spritesheet("player", "images/spritesheets/player_transp.png", 14, 20, 12, 0, 2);
            this.load.image("textboard", "images/items/textboard.png");
            this.load.image("door", "images/items/door.png");
            this.load.image("invisibleBlock", "images/items/invisibleBlock.png");
        };
        LoadState.prototype.create = function () {
            this.game.state.start("GameState", true, false, this.map, this.tileset);
        };
        return LoadState;
    })(Phaser.State);
    States.LoadState = LoadState;
})(States || (States = {}));
//# sourceMappingURL=LoadState.js.map