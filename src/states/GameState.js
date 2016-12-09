var States;
(function (States) {
    var MapCreator = Classes.Util.MapCreator;
    var Rat = Classes.Rat;
    var Player = Classes.Player;
    class GameState extends Phaser.State {
        constructor(...args) {
            super(...args);
            this.displayingText = false;
        }
        init(mapname, tileset) {
            this.mapname = mapname;
            this.tileset = tileset;
        }
        create() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.cursors = this.input.keyboard.createCursorKeys();
            this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            new MapCreator().createMap(this);
            this.addPlayerAndCamera();
            this.game.state.start("EncounterState", true, false, [new Rat()], this, this.player);
        }
        update() {
            this.physics.arcade.collide(this.player, this.collisionLayer);
            this.physics.arcade.collide(this.player, this.items.children.filter((child) => child.customProperties.collides));
            this.items.children.forEach((child) => {
                if (child.overlap(this.player)) {
                    child.customProperties.handleOverlap(this);
                }
                else if (child.customProperties.handleNoOverlap) {
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
    States.GameState = GameState;
})(States || (States = {}));
//# sourceMappingURL=GameState.js.map