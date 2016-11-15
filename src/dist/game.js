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
            this.load.image("encounter", "images/items/transparant.png");
            this.load.spritesheet("button", "images/menus/buttonBig.png", 200, 100);
            this.load.spritesheet("paginationPrevious", "images/menus/paginationPrevious.png", 50, 50);
            this.load.spritesheet("paginationNext", "images/menus/paginationNext.png", 50, 50);
            this.load.spritesheet("player_backsprite", "images/encounter/player_backsprite.png", 200, 200);
            this.load.spritesheet("rat", "images/encounter/rat.png", 200, 200);
        }
        create() {
            this.game.state.start("GameState", true, false, this.map, this.tileset);
        }
    }
    States.LoadState = LoadState;
})(States || (States = {}));
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
    class EncounterTrigger {
        constructor(x, y, sprite, possibleEnemies, encounterRate, widthInTiles, heightInTiles) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.possibleEnemies = possibleEnemies;
            this.encounterRate = encounterRate;
            this.widthInTiles = widthInTiles;
            this.heightInTiles = heightInTiles;
            this.encounterPercentages = [1, 10, 25, 50, 100];
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.possibleEnemies = possibleEnemies;
            this.encounterRate = encounterRate;
            this.widthInTiles = widthInTiles;
            this.heightInTiles = heightInTiles;
        }
        getCustomProperties() {
            return {
                collides: false,
                handleOverlap: this.handleOverlap,
                handleNoOverlap: this.handleNoOverlap,
                startEncounter: this.startEncounter,
                possibleEnemies: this.possibleEnemies,
                encounterRate: this.encounterRate,
                encounterPercentages: this.encounterPercentages,
                timeLoop: this.timeLoop,
                state: this.state
            };
        }
        startEncounter() {
            var randomBetweenZeroAndHundred = Math.floor(Math.random() * 100) + 1;
            if (this.encounterPercentages[this.encounterRate] < randomBetweenZeroAndHundred) {
                this.state.game.state.start("EncounterState", true, false, this.possibleEnemies, this.state, this.state.player);
            }
        }
        handleNoOverlap(state) {
            if (this.timeLoop) {
                console.log("Left encounter tile");
                state.game.time.events.remove(this.timeLoop);
                this.timeLoop = undefined;
            }
        }
        handleOverlap(state) {
            console.log("Entered encounter tile");
            this.state = state;
            if (!this.timeLoop) {
                this.timeLoop = state.game.time.events.loop(Phaser.Timer.SECOND * 5, this.startEncounter, this);
            }
        }
    }
    Classes.EncounterTrigger = EncounterTrigger;
})(Classes || (Classes = {}));
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
                    if (item.properties.type === "encounter") {
                        items.push(new Classes.EncounterTrigger(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.possibleEnemies.split(","), item.properties.encounterRate, item.properties.widthInTiles, item.properties.heightInTiles));
                    }
                });
                return items;
            }
            addToGroup(item, group) {
                let sprite = group.create(item.x, item.y, item.sprite);
                if (item instanceof Classes.EncounterTrigger) {
                    sprite.width = sprite.width * item.widthInTiles;
                    sprite.height = sprite.height * item.heightInTiles;
                }
                sprite.customProperties = item.getCustomProperties();
                sprite.body.immovable = sprite.customProperties.collides;
            }
        }
        Util.MapCreator = MapCreator;
    })(Util = Classes.Util || (Classes.Util = {}));
})(Classes || (Classes = {}));
var Classes;
(function (Classes) {
    class Stats {
        constructor(level, maxhealth, maxmana, attack, defense, speed) {
            this.level = level;
            this.maxhealth = maxhealth;
            this.currenthealth = maxhealth;
            this.maxmana = maxmana;
            this.currentmana = maxmana;
            this.attack = attack;
            this.defense = defense;
            this.speed = speed;
        }
    }
    Classes.Stats = Stats;
    class StatsBuilder {
        stats() {
            return this;
        }
        build() {
            return new Stats(this.level, this.maxhealth, this.maxmana, this.attack, this.defense, this.speed);
        }
        withLevel(value) {
            this.level = value;
            return this;
        }
        withMaxhealth(value) {
            this.maxhealth = value;
            return this;
        }
        withMaxmana(value) {
            this.maxmana = value;
            return this;
        }
        withAttack(value) {
            this.attack = value;
            return this;
        }
        withDefense(value) {
            this.defense = value;
            return this;
        }
        withSpeed(value) {
            this.speed = value;
            return this;
        }
    }
    Classes.StatsBuilder = StatsBuilder;
})(Classes || (Classes = {}));
var Classes;
(function (Classes) {
    var Util;
    (function (Util) {
        var Constants;
        (function (Constants) {
            Constants.GAME_WIDTH = 800;
            Constants.GAME_HEIGHT = 600;
            Constants.ENCOUNTER_MENU_BUTTON_WIDTH = 200;
            Constants.ENCOUNTER_MENU_BUTTON_HEIGHT = 100;
        })(Constants = Util.Constants || (Util.Constants = {}));
    })(Util = Classes.Util || (Classes.Util = {}));
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
            this.createPlayerStats();
        }
        createPlayerStats() {
            this.playerStats = new Classes.StatsBuilder().stats()
                .withLevel(1)
                .withAttack(10)
                .withDefense(10)
                .withSpeed(10)
                .withMaxhealth(100)
                .withMaxmana(10)
                .build();
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
    var Constants = Classes.Util.Constants;
    class ButtonBuilder {
        constructor() {
            this.text = "";
        }
        static statelessButton() {
            return new ButtonBuilder()
                .withHasStates(false);
        }
        static statefullButton() {
            return new ButtonBuilder()
                .withHasStates(true);
        }
        build() {
            let button = this.createButton();
            let text = this.state.game.add.text(0, 0, this.text, this.style ? this.style : this.defaultStyling());
            text.setTextBounds(0, 0, Constants.ENCOUNTER_MENU_BUTTON_WIDTH, Constants.ENCOUNTER_MENU_BUTTON_HEIGHT);
            button.addChild(text);
            return button;
        }
        defaultStyling() {
            return {
                font: 'bold 24pt Arial',
                wordWrap: true,
                wordWrapWidth: Constants.ENCOUNTER_MENU_BUTTON_WIDTH,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
        }
        createButton() {
            this.assureImageKeyNotUndefined();
            if (this.hasStates) {
                return this.state.game.add.button(this.x, this.y, this.imageKey, this.clickFunction, this.state, 0, 1, 2, 3);
            }
            else {
                return this.state.game.add.button(this.x, this.y, this.imageKey, this.clickFunction, this.state, 0);
            }
        }
        assureImageKeyNotUndefined() {
            if (!this.imageKey) {
                this.imageKey = "button";
            }
        }
        withX(value) {
            this.x = value;
            return this;
        }
        withY(value) {
            this.y = value;
            return this;
        }
        withStyle(value) {
            this.style = value;
            return this;
        }
        withText(value) {
            this.text = value;
            return this;
        }
        withClickFunction(value) {
            this.clickFunction = value;
            return this;
        }
        withImageKey(value) {
            this.imageKey = value;
            return this;
        }
        withState(value) {
            this.state = value;
            return this;
        }
        withHasStates(value) {
            this.hasStates = value;
            return this;
        }
    }
    Classes.ButtonBuilder = ButtonBuilder;
})(Classes || (Classes = {}));
var States;
(function (States) {
    var Constants = Classes.Util.Constants;
    var ButtonBuilder = Classes.ButtonBuilder;
    class EncounterState extends Phaser.State {
        constructor(...args) {
            super(...args);
            this.attackButtons = [];
            this.currentItemsPage = 0;
            this.numberOfItemsPerPage = 5;
            this.currentlyShownItems = [];
        }
        init(possibleEnemies, state, player) {
            this.possibleEnemies = possibleEnemies;
            this.state = state;
            this.player = player;
            this.attacks = [{ name: "Bite", power: 10 }, { name: "Scratch", power: 15 }, { name: "Weep", power: 0 }];
            this.items = [
                { name: "Potion", amount: 5 },
                { name: "Smoke bomb", amount: 2 },
                { name: "X marker", amount: 1 },
                { name: "X attacker", amount: 1 },
                { name: "X defender", amount: 1 },
                { name: "Pokéball", amount: 1 },
                { name: "Link's sword", amount: 1 },
                { name: "???", amount: 1 },
                { name: "Mattress", amount: 1 },
                { name: "Bowl of pee", amount: 1 },
                { name: "Eleven", amount: 1 }
            ];
            this.add.sprite(200, 200, "player_backsprite");
            this.add.sprite(10, 10, this.possibleEnemies[0].getImageKey());
            this.add.sprite(290, 10, this.possibleEnemies[0].getImageKey());
            this.add.sprite(570, 10, this.possibleEnemies[0].getImageKey());
        }
        create() {
            this.createBaseMenu();
            this.createAttacksMenu();
            this.orderItems();
            this.createItemPaginationButtons();
        }
        createBaseMenu() {
            this.mainMenu = [
                ButtonBuilder.statefullButton()
                    .withText("Attack")
                    .withX(0)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this)
                    .withClickFunction(this.openAttacksMenu)
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText("Items")
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this)
                    .withClickFunction(this.openBag)
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText("Special")
                    .withX(0)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.useSpecial)
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText("Flee")
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.flee)
                    .build()
            ];
        }
        ;
        createAttacksMenu() {
            this.attackButtons = [
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(0))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this)
                    .withClickFunction(this.attack(this.attacks[0]))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(1))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this)
                    .withClickFunction(this.attack(this.attacks[1]))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(2))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.attack(this.attacks[2]))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(3))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.attack(this.attacks[3]))
                    .build()
            ];
            this.attackButtons.forEach(function (button, index) {
                button.inputEnabled = this.hasAttackInSlot(index);
                button.visible = false;
            }, this);
        }
        ;
        createItemPaginationButtons() {
            let itemsToShow = this.items.slice(this.currentItemsPage * 5, this.numberOfItemsPerPage);
            this.itemPaginationPreviousButton =
                ButtonBuilder.statelessButton()
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(((itemsToShow.length - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.previousItems)
                    .withImageKey("paginationPrevious")
                    .build();
            this.itemPaginationNextButton =
                ButtonBuilder.statelessButton()
                    .withX((Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3) + 150)
                    .withY(((itemsToShow.length - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.nextItems)
                    .withImageKey("paginationNext")
                    .build();
            this.itemPaginationPreviousButton.visible = false;
            this.itemPaginationNextButton.visible = false;
        }
        determineAttackButtonText(index) {
            if (this.hasAttackInSlot(index)) {
                return this.attacks[index].name;
            }
            return "-";
        }
        hasAttackInSlot(index) {
            return this.attacks.length - 1 >= index;
        }
        ;
        openAttacksMenu() {
            this.destroyItemsMenu();
            this.showAttacks();
        }
        showAttacks() {
            this.attackButtons.forEach(function (btn) {
                btn.visible = true;
            });
        }
        ;
        hideAttacks() {
            this.attackButtons.forEach(function (btn) {
                btn.visible = false;
            });
        }
        ;
        attack(attack) {
            return function () {
                console.log("ATTACK! " + attack.name + " " + attack.power + "DMG");
            };
        }
        orderItems() {
            this.items.sort(function (item, item2) {
                return item.name > item2.name ? 1 : -1;
            });
        }
        openBag() {
            this.hideAttacks();
            this.createCurrentShownItems();
            this.itemPaginationNextButton.visible = this.items.length > this.numberOfItemsPerPage;
        }
        createCurrentShownItems() {
            var start = this.currentItemsPage * 5;
            let itemsToShow = this.items.slice(start, start + this.numberOfItemsPerPage);
            for (let i = 0; i < itemsToShow.length; i++) {
                let createdButton = ButtonBuilder.statefullButton()
                    .withText(itemsToShow[i].name)
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(i * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.useItem(itemsToShow[i].name))
                    .build();
                this.currentlyShownItems.push(createdButton);
            }
        }
        previousItems() {
            this.destroyItemsMenu();
            this.currentItemsPage--;
            this.createCurrentShownItems();
            this.itemPaginationNextButton.visible = true;
            this.itemPaginationPreviousButton.visible = this.currentItemsPage !== 0;
        }
        nextItems() {
            this.destroyItemsMenu();
            this.currentItemsPage++;
            this.createCurrentShownItems();
            this.itemPaginationPreviousButton.visible = true;
            this.itemPaginationNextButton.visible = this.items.length > (this.currentItemsPage * 5) + this.numberOfItemsPerPage;
        }
        destroyItemsMenu() {
            this.currentlyShownItems.forEach(function (item) {
                item.destroy();
            });
            this.currentlyShownItems = [];
            this.itemPaginationNextButton.visible = false;
            this.itemPaginationPreviousButton.visible = false;
        }
        useItem(itemName) {
            return function () {
                console.log("USED " + itemName);
            };
        }
        useSpecial() {
            this.hideAttacks();
            this.destroyItemsMenu();
            console.log("I'm special!");
        }
        flee() {
            this.game.state.start('LoadState', false, false, "mymap1", "MyTileset");
        }
        update() {
        }
    }
    States.EncounterState = EncounterState;
})(States || (States = {}));
var Classes;
(function (Classes) {
    class Enemy {
        constructor(stats, imageKey) {
            this.stats = stats;
            this.imageKey = imageKey;
        }
        getImageKey() {
            return this.imageKey;
        }
    }
    Classes.Enemy = Enemy;
})(Classes || (Classes = {}));
var Classes;
(function (Classes) {
    class Rat extends Classes.Enemy {
        constructor() {
            super(Rat.createRatStats(), "rat");
        }
        static createRatStats() {
            return new Classes.StatsBuilder()
                .stats()
                .withMaxhealth(100)
                .withMaxmana(0)
                .withAttack(1)
                .withDefense(2)
                .withSpeed(5)
                .build();
        }
        performTurn(encounterState) {
        }
        ;
    }
    Classes.Rat = Rat;
})(Classes || (Classes = {}));
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
            this.game.state.start("EncounterState", true, false, [new Rat()], this, this.player);
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.cursors = this.input.keyboard.createCursorKeys();
            this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            new MapCreator().createMap(this);
            this.addPlayerAndCamera();
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
                collides: this.collides,
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