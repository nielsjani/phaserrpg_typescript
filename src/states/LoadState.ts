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
            this.load.image("encounter", "images/items/transparant.png");

            //encounter state
            //this.load.spritesheet("button", "images/menus/button.png", 60, 40);
            this.load.spritesheet("button", "images/menus/buttonBig.png", 200, 100);
            this.load.spritesheet("paginationPrevious", "images/menus/paginationPrevious.png", 50, 50);
            this.load.spritesheet("paginationNext", "images/menus/paginationNext.png", 50, 50);
            this.load.spritesheet("player_backsprite", "images/encounter/player_backsprite.png", 200,200);
            this.load.spritesheet("rat", "images/encounter/rat.png", 200,200);
        }

        create() {
            this.game.state.start("GameState", true, false, this.map, this.tileset);
        }
    }
}