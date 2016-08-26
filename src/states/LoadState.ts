///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace States {
    export class LoadState extends Phaser.State {
        map: string;
        tileset: string;

        init(map: string, tileset: string) {
            this.map = map;
            this.tileset = tileset;

        }

        preload() {
            this.load.tilemap("mymap1", "images/maps/mymap1.json", null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("mymap2", "images/maps/mymap2.json", null, Phaser.Tilemap.TILED_JSON);
            this.load.image("MyTileset", "images/tilesets/MyTileset.png");
            this.load.spritesheet("player", "images/spritesheets/player_transp.png", 42, 60, 12, 0, 6);
            this.load.image("warningsign", "images/items/warningsign.png");
            this.load.image("portal", "images/items/portal.png");
        }

        create() {
            this.game.state.start("GameState", true, false, this.map, this.tileset);
        }
    }
}