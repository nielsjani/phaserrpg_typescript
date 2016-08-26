var States;
(function (States) {
    class LoadState extends Phaser.State {
        init(map, tileset) {
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
    States.LoadState = LoadState;
})(States || (States = {}));
var Classes;
(function (Classes) {
    var Util;
    (function (Util) {
        class MapCreator {
            constructor() {
            }
            createMap(state) {
                state.map = state.add.tilemap(state.mapname);
                state.map.addTilesetImage(state.tileset, state.tileset);
                state.groundLayer = state.map.createLayer("groundlayer");
                state.collisionLayer = state.map.createLayer("collisionlayer");
                this.addItems(state);
                state.map.setCollisionBetween(1, 100000, true, 'collisionlayer');
                state.groundLayer.resizeWorld();
                state.collisionLayer.resizeWorld();
            }
            addItems(state) {
                state.items = state.add.group();
                state.items.enableBody = true;
                let itemsFromJson = this.getItems(state);
                itemsFromJson.forEach((item) => {
                    this.addToGroup(item, state.items);
                });
            }
            getItems(state) {
                let items = [];
                state.map.objects["itemlayer"].forEach((item) => {
                    if (item.properties.type === "text") {
                        items.push(new Classes.TextItem(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.text));
                    }
                    if (item.properties.type === "door") {
                        items.push(new Classes.DoorItem(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.map, item.properties.x, item.properties.y, item.properties.tileset));
                    }
                });
                return items;
            }
            addToGroup(item, group) {
                let sprite = group.create(item.x, item.y, item.sprite);
                sprite.customProperties = item.getCustomProperties();
                sprite.body.immovable = sprite.customProperties.collides;
            }
        }
        Util.MapCreator = MapCreator;
    })(Util = Classes.Util || (Classes.Util = {}));
})(Classes || (Classes = {}));
var States;
(function (States) {
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
            new Classes.Util.MapCreator().createMap(this);
            this.addPlayerAndCamera();
        }
        update() {
            this.physics.arcade.collide(this.player, this.collisionLayer);
            this.physics.arcade.collide(this.player, this.items.children.filter((child) => child.customProperties.collides));
            this.items.children.forEach((child) => {
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
    States.GameState = GameState;
})(States || (States = {}));
class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);
        this.state.add("LoadState", States.LoadState, false);
        this.state.add("GameState", States.GameState, false);
        this.state.start('LoadState', false, false, "mymap1", "MyTileset");
    }
}
new Game();
var Classes;
(function (Classes) {
    class DoorItem {
        constructor(x, y, sprite, map, playerx, playery, tileset) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.map = map;
            this.playerx = playerx;
            this.playery = playery;
            this.tileset = tileset;
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.map = map;
            this.playerx = playerx;
            this.playery = playery;
            this.tileset = tileset;
        }
        getCustomProperties() {
            return {
                map: this.map,
                tileset: this.tileset,
                collides: false,
                playerx: this.playerx,
                playery: this.playery,
                handleOverlap: this.handleOverlap
            };
        }
        handleOverlap(state) {
            state.game.state.start("GameState", true, false, this.map, this.tileset);
        }
    }
    Classes.DoorItem = DoorItem;
})(Classes || (Classes = {}));
var Classes;
(function (Classes) {
    class Player extends Phaser.Sprite {
        constructor(state, x, y, imageRef) {
            super(state.game, x, y, imageRef);
            this.state = state;
            this.x = x;
            this.y = y;
            this.imageRef = imageRef;
            this.state = state;
            this.animations.add('left', [0, 1, 2], 10, true);
            this.animations.add('right', [3, 4, 5], 10, true);
            this.animations.add('down', [6, 7, 8], 10, true);
            this.animations.add('up', [9, 10, 11], 10, true);
            this.state.physics.arcade.enable(this);
            this.createIdlePoses();
        }
        createIdlePoses() {
            this.idlePoses = new Map();
            this.idlePoses.set("left", 1);
            this.idlePoses.set("right", 4);
            this.idlePoses.set("down", 7);
            this.idlePoses.set("up", 10);
        }
        update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (!this.state.displayingText) {
                if (this.state.cursors.left.isDown) {
                    this.body.velocity.x -= 600;
                    this.animations.play("left");
                    this.lastDirection = "left";
                }
                else if (this.state.cursors.right.isDown) {
                    this.body.velocity.x += 600;
                    this.animations.play("right");
                    this.lastDirection = "right";
                }
                else if (this.state.cursors.up.isDown) {
                    this.body.velocity.y -= 600;
                    this.animations.play("up");
                    this.lastDirection = "up";
                }
                else if (this.state.cursors.down.isDown) {
                    this.body.velocity.y += 600;
                    this.animations.play("down");
                    this.lastDirection = "down";
                }
                else {
                    this.animations.stop();
                    this.frame = this.lastDirection ? this.idlePoses.get(this.lastDirection) : 7;
                }
            }
        }
    }
    Classes.Player = Player;
})(Classes || (Classes = {}));
var Classes;
(function (Classes) {
    class TextDisplay extends Phaser.Text {
        constructor(state, x, y, text) {
            super(state.game, x, y, text, TextDisplay.getStyle());
            this.state = state;
            this.x = x;
            this.y = y;
            this.text = text;
            this.setText(this.getFirstTextChunk(text));
            this.setTextBounds(state.camera.x + 25, state.camera.y + (state.camera.height - 150), 800, 100);
        }
        updateTextbox() {
            this.setText(this.textToDisplay[this.textDisplayingPart + 1]);
            this.setStyle(TextDisplay.getStyle());
            this.textDisplayingPart += 1;
        }
        hasMore() {
            return this.textDisplayingPart + 1 < this.textToDisplay.length;
        }
        static getStyle() {
            return {
                align: "left",
                font: 'bold 24pt Arial',
                fill: 'white',
                wordWrap: true,
                wordWrapWidth: 750,
                backgroundColor: "blue",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
        }
        getFirstTextChunk(text) {
            this.textToDisplay = text.split("#");
            this.textDisplayingPart = 1;
            return this.textToDisplay[this.textDisplayingPart];
        }
    }
    Classes.TextDisplay = TextDisplay;
})(Classes || (Classes = {}));
var Classes;
(function (Classes) {
    var TextDisplay = Classes.TextDisplay;
    class TextItem {
        constructor(x, y, sprite, text) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.text = text;
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.text = text;
            this.collides = true;
        }
        getCustomProperties() {
            return {
                text: this.text,
                collides: true,
                handleOverlap: this.handleOverlap
            };
        }
        handleOverlap(state) {
            if (state.spacebar.justDown) {
                if (!state.displayingText) {
                    state.currentlyDisplayedText = new TextDisplay(state, 0, 0, this.text);
                    state.add.existing(state.currentlyDisplayedText);
                    state.displayingText = true;
                }
                else if (state.currentlyDisplayedText.hasMore()) {
                    state.currentlyDisplayedText.updateTextbox();
                }
                else {
                    state.currentlyDisplayedText.destroy();
                    state.displayingText = false;
                }
            }
        }
    }
    Classes.TextItem = TextItem;
})(Classes || (Classes = {}));
//# sourceMappingURL=game.js.map