///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace States {
    export class LoadState extends Phaser.State {
        map: any;
        tileset: any;

        init(map: any, tileset: any) {
            this.map = map;
            this.tileset = tileset;

        }

        preload() {
            this.load.tilemap("map1", "images/maps/map1.json", null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map2", "images/maps/map2.json", null, Phaser.Tilemap.TILED_JSON);
            this.load.image("pokemon1", "images/tilesets/tileset1.png");
            this.load.image("tileset1", "images/tilesets/tileset1.png");
            this.load.spritesheet("player", "images/spritesheets/player_transp.png", 14, 20, 12, 0, 2);
            this.load.image("textboard", "images/items/textboard.png");
            this.load.image("door", "images/items/door.png");
            this.load.image("invisibleBlock", "images/items/invisibleBlock.png");

        }

        create() {
            this.game.state.start("GameState", true, false, this.map, this.tileset);
        }
    }
}