///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
///<reference path="../classes/util/Constants.ts"/>
///<reference path="../classes/battle/player/Player.ts"/>
///<reference path="../classes/phaser_expansions/ButtonBuilder.ts"/>

namespace States {
    import Constants  = Classes.Util.Constants;
    import TextDisplay = Classes.TextDisplay;
    import Player = Classes.Player;
    import ArraySet = Phaser.ArraySet;
    import Enemy = Classes.Enemy;
    import Rat = Classes.Rat;
    import ButtonBuilder = Classes.ButtonBuilder;

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

        private createBaseMenu() {
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
        };

        private createAttacksMenu() {
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
        };

        private createItemPaginationButtons() {
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
                    .withX((Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3) +150)
                    .withY(((itemsToShow.length - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.nextItems)
                    .withImageKey("paginationNext")
                    .build();
            this.itemPaginationPreviousButton.visible = false;
            this.itemPaginationNextButton.visible = false
        }

        private determineAttackButtonText(index: number) {
            if (this.hasAttackInSlot(index)) {
                return this.attacks[index].name;
            }
            return "-";
        }

        private hasAttackInSlot(index: number) {
            return this.attacks.length - 1 >= index;
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

        private attack(attack: any) {
            return function() {
                console.log("ATTACK! " + attack.name + " " + attack.power + "DMG");
            };
        }

        private orderItems() {
            this.items.sort(function (item, item2) {
                return item.name > item2.name ? 1 : -1;
            });
        }

        private openBag() {
            this.hideAttacks();
            this.createCurrentShownItems();
            this.itemPaginationNextButton.visible = this.items.length > this.numberOfItemsPerPage;
        }

        private createCurrentShownItems() {
            var start = this.currentItemsPage * 5;
            let itemsToShow = this.items.slice(start, start + this.numberOfItemsPerPage);
            for (let i = 0; i < itemsToShow.length; i++) {
                let createdButton =
                    ButtonBuilder.statefullButton()
                    .withText(itemsToShow[i].name)
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(i * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this)
                    .withClickFunction(this.useItem(itemsToShow[i].name))
                    .build();
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

