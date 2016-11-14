///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="../classes/util/Constants.ts"/>

namespace States {
    import Constants  = Classes.Util.Constants;
    import TextDisplay = Classes.TextDisplay;
    import Player = Classes.Player;
    import ArraySet = Phaser.ArraySet;
    import Enemy = Classes.Enemy;
    import Rat = Classes.Rat;

    export class EncounterState extends Phaser.State {
        //TODO: attacks: field on player
        private attacks: any[];
        private items: any[];
        private possibleEnemies: Enemy[];
        private state: Phaser.State;
        private player: Player;

        private attackButtons: Phaser.Button[] = [];

        private currentItemsPage: number = 0;
        private numberOfItemsPerPage: number = 5;
        private currentlyShownItems: Phaser.Button[] = [];
        private itemPaginationPreviousButton: Phaser.Button;
        private itemPaginationNextButton: Phaser.Button;
        private mainMenu: Phaser.Button[];

        //TODO: display health/MP
        //TODO: display enemies
        //TODO: information textbox with text that describes when something has happened
        //TODO: turn-based

        init(possibleEnemies: Enemy[], state: Phaser.State, player: Player) {
            this.possibleEnemies = possibleEnemies;
            this.state = state;
            this.player = player;
            this.attacks = [{name: "Bite", power: 10}, {name: "Scratch", power: 15}, {name: "Weep", power: 0}];
            this.items = [
                {name: "Potion", amount: 5},
                {name: "Smoke bomb", amount: 2},
                {name: "X marker", amount: 1},
                {name: "X attacker", amount: 1},
                {name: "X defender", amount: 1},
                {name: "Pokéball", amount: 1},
                {name: "Link's sword", amount: 1},
                {name: "???", amount: 1},
                {name: "Mattress", amount: 1},
                {name: "Bowl of pee", amount: 1},
                {name: "Eleven", amount: 1}
            ];

            this.add.sprite(200,200, "player_backsprite");
            this.add.sprite(10,10, this.possibleEnemies[0].getImageKey());
            this.add.sprite(290,10, this.possibleEnemies[0].getImageKey());
            this.add.sprite(570,10, this.possibleEnemies[0].getImageKey());
        }


        create() {
            //TODO: buttonfactory/builder
            this.createBaseMenu();
            this.createAttacksMenu();
            this.aggregateAndOrderItems();
            this.createItemPaginationButtons();
        }

        private createBaseMenu() {
            this.mainMenu = [
                this.createButtonWithText("Attack", 0, Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2), this.openAttacksMenu),
                this.createButtonWithText("Items", Constants.ENCOUNTER_MENU_BUTTON_WIDTH, Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2), this.openBag),
                this.createButtonWithText("Special", 0, Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT, this.useSpecial),
                this.createButtonWithText("Flee", Constants.ENCOUNTER_MENU_BUTTON_WIDTH, Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT, this.flee)
            ];
        };

        private createAttacksMenu() {
            let attack1 = this.createAttackButton(0, Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2, Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2), this.useAttack1);
            let attack2 = this.createAttackButton(1, Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3, Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2), this.useAttack2);
            let attack3 = this.createAttackButton(2, Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2, Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT, this.useAttack3);
            let attack4 = this.createAttackButton(3, Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3, Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT, this.useAttack4);
            this.attackButtons.push(attack1, attack2, attack3, attack4);
        };

        private createItemPaginationButtons() {
            let itemsToShow = this.items.slice(this.currentItemsPage * 5, this.numberOfItemsPerPage);
            this.itemPaginationPreviousButton = this.createButtonWithTextAndImage("",
                Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3,
                ((itemsToShow.length - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT,
                this.previousItems,
                "paginationPrevious",
                false);
            this.itemPaginationNextButton = this.createButtonWithTextAndImage("",
                (Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3) + 150,
                ((itemsToShow.length - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT,
                this.nextItems,
                "paginationNext",
                false);
            this.itemPaginationPreviousButton.visible = false;
            this.itemPaginationNextButton.visible = false
        }

        private createAttackButton(index: number, x: number, y: number, clickFunction: any) {
            let text = "-";
            if (this.hasAttackInSlot(index)) {
                text = this.attacks[index].name;
            }
            let createdButton = this.createButtonWithText(text, x, y, clickFunction);
            createdButton.inputEnabled = this.hasAttackInSlot(index);
            createdButton.visible = false;
            return createdButton;
        }

        private hasAttackInSlot(index: number) {
            return this.attacks.length - 1 >= index;
        };

        private createButtonWithText(buttonText: string, x: number, y: number, clickFunction: any): Phaser.Button {
            return this.createButtonWithTextAndImage(buttonText, x, y, clickFunction, "button", true);
        };

        private createButtonWithTextAndImage(buttonText: string, x: number, y: number, clickFunction: any, buttonImage: string, hasStates: boolean): Phaser.Button {
            let button = hasStates ? this.state.game.add.button(x, y, buttonImage, clickFunction, this, 0, 1, 2, 3) :
                this.state.game.add.button(x, y, buttonImage, clickFunction, this, 0);

            let textStyle = {
                font: 'bold 24pt Arial',
                wordWrap: true,
                wordWrapWidth: Constants.ENCOUNTER_MENU_BUTTON_WIDTH,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            let text = this.game.add.text(0, 0, buttonText, textStyle);
            text.setTextBounds(0, 0, Constants.ENCOUNTER_MENU_BUTTON_WIDTH, Constants.ENCOUNTER_MENU_BUTTON_HEIGHT);
            button.addChild(text);
            return button;
        };

        private openAttacksMenu() {
            this.destroyItemsMenu();
            this.showAttacks();
        }

        private showAttacks() {
            this.attackButtons.forEach(function (btn) {
                btn.visible = true;
            });
        };

        private hideAttacks() {
            this.attackButtons.forEach(function (btn) {
                btn.visible = false;
            });
        };

        private useAttack1() {
            this.attack(this.attacks[0]);
        }

        private useAttack2() {
            this.attack(this.attacks[1]);
        }

        private useAttack3() {
            this.attack(this.attacks[2]);
        }

        private useAttack4() {
            this.attack(this.attacks[3]);
        }

        private attack(attack: any) {
            console.log("ATTACK! " + attack.name + " " + attack.power + "DMG");
        }

        private aggregateAndOrderItems() {
            this.sortItemsByName();
            //TODO: add buttons to UI paginated by 5 or 10
        }

        private sortItemsByName() {
            this.items.sort(function (item, item2) {
                return item.name > item2.name ? 1 : -1;
            });
        };

        private openBag() {
            this.hideAttacks();
            this.createCurrentShownItems();
            this.itemPaginationNextButton.visible = this.items.length > this.numberOfItemsPerPage;
        }

        private createCurrentShownItems() {
            var start = this.currentItemsPage * 5;
            let itemsToShow = this.items.slice(start, start + this.numberOfItemsPerPage);
            for (let i = 0; i < itemsToShow.length; i++) {
                let createdButton = this.createButtonWithText(itemsToShow[i].name,
                    Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3,
                    i * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT,
                    this.useItem(itemsToShow[i].name));
                this.currentlyShownItems.push(createdButton);
            }
        }

        private previousItems() {
            this.destroyItemsMenu();
            this.currentItemsPage--;
            this.createCurrentShownItems();
            this.itemPaginationNextButton.visible = true;
            this.itemPaginationPreviousButton.visible = this.currentItemsPage !== 0;
        }

        private nextItems() {
            this.destroyItemsMenu();
            this.currentItemsPage++;
            this.createCurrentShownItems();
            this.itemPaginationPreviousButton.visible = true;
            this.itemPaginationNextButton.visible = this.items.length > (this.currentItemsPage * 5) + this.numberOfItemsPerPage;
        }

        private destroyItemsMenu() {
            this.currentlyShownItems.forEach(function (item) {
                item.destroy();
            });
            this.currentlyShownItems = [];
            this.itemPaginationNextButton.visible = false;
            this.itemPaginationPreviousButton.visible = false;
        }

        private useItem(itemName: string) {
            //TODO: should call the 'use' method on the item object and remove it from the bag afterwards
            return function () {
                console.log("USED " + itemName);
            }
        }

        private useSpecial() {
            this.hideAttacks();
            this.destroyItemsMenu();
            console.log("I'm special!");
        }

        private flee() {
            //TODO: encounterstate needs to know the map and tileset and x/y to return to
            this.game.state.start('LoadState', false, false, "mymap1", "MyTileset");
        }

        update() {

        }
    }
}

