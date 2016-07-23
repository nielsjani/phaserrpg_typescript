///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="../classes/util/MapCreator.ts"/>

namespace States {
    import TextDisplay = Classes.TextDisplay;

    export class GameState extends Phaser.State {
        mapname:any;
        tileset:any;
        cursors:any;
        spacebar:any;
        map:any;
        groundLayer:any;
        collisionLayer:any;
        player:any;
        items:any;
        displayingText: boolean = false;
        currentlyDisplayedText: TextDisplay;


        init(mapname:any, tileset:any) {
            this.mapname = mapname;
            this.tileset = tileset;
        }

        create() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.cursors = this.input.keyboard.createCursorKeys();
            this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            new Classes.Util.MapCreator().createMap(this);
            this.addPlayerAndCamera();

        }

        update() {
            this.physics.arcade.collide(this.player, this.collisionLayer);
            this.physics.arcade.collide(this.player, this.items.children.filter((child:any)=> child.customProperties.collides));

            this.items.children.forEach((child:any) => {
                if (child.overlap(this.player)) {
                    child.customProperties.handleOverlap(this);
                }
            });
        }

        addPlayerAndCamera() {
            this.player = new Classes.Player(this, 100, 100, "player");
            this.add.existing(this.player);

            this.camera.follow(this.player);
        }
    }
}

