///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="../classes/util/MapCreator.ts"/>
///<reference path="../classes/battle/enemies/Rat.ts"/>
///<reference path="../classes/battle/player/Player.ts"/>

import {TextDisplay} from "../classes/items/TextDisplay";
import {MapCreator} from "../classes/util/MapCreator";
import {Rat} from "../classes/battle/enemies/Rat";
import {Player} from "../classes/battle/player/Player";

export class GameState extends Phaser.State {
    mapname: string;
    tileset: string;
    cursors: Phaser.CursorKeys;
    spacebar: Phaser.Key;
    map: any;
    groundLayer: Phaser.TilemapLayer;
    collisionLayer: Phaser.TilemapLayer;
    player: Player;
    items: Phaser.Group;
    displayingText: boolean = false;
    currentlyDisplayedText: TextDisplay;

    init(mapname: string, tileset: string) {
        this.mapname = mapname;
        this.tileset = tileset;
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        new MapCreator().createMap(this);
        this.addPlayerAndCamera();

        //TEMPORARY
        this.game.state.start("EncounterState", true, false, [new Rat()], this, this.player);
    }

    update() {
        this.physics.arcade.collide(this.player, this.collisionLayer);
        this.physics.arcade.collide(this.player, this.items.children.filter((child: any) => child.customProperties.collides));

        this.items.children.forEach((child: any) => {
            if (child.overlap(this.player)) {
                child.customProperties.handleOverlap(this);
            } else if (child.customProperties.handleNoOverlap) {
                child.customProperties.handleNoOverlap(this);
            }
        });
    }

    addPlayerAndCamera() {
        this.player = new Player(this, 100, 100, "player");
        this.add.existing(this.player);

        this.camera.follow(this.player);
    }
}