///<reference path="../../classes/util/Constants.ts"/>
///<reference path="../../classes/phaser_expansions/ButtonBuilder.ts"/>

namespace States {
    import ButtonBuilder = Classes.ButtonBuilder;
    import Constants  = Classes.Util.Constants;
    export class EncounterStateMenuManager {
        private encounterState: EncounterState;
        private mainMenu: Phaser.Button[];
        private attackButtons: Phaser.Button[];

        private currentItemsPage: number = 0;
        private numberOfItemsPerPage: number = 5;

        private itemPaginationPreviousButton: Phaser.Button;
        private itemPaginationNextButton: Phaser.Button;
        private currentlyShownItems: Phaser.Button[] = [];

        constructor(private state: EncounterState) {
            this.encounterState = state;
        }

        createBaseMenu(specialButtonFunction: any, fleeButtonFunction: any) {
            this.mainMenu = [
                ButtonBuilder.statefullButton()
                    .withText("Attack")
                    .withX(0)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this.encounterState)
                    .withClickFunction(this.openAttacksMenu())
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText("Items")
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this.encounterState)
                    .withClickFunction(this.openBag())
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText("Special")
                    .withX(0)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(this.useSpecial(specialButtonFunction))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText("Flee")
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(fleeButtonFunction)
                    .build()
            ];
        };

        private showAttacks() {
            this.attackButtons.forEach(btn => btn.visible = true);
        };

        private hideAttacks() {
            this.attackButtons.forEach(btn => btn.visible = false);

        };

        private openAttacksMenu() {
            return () => {
                this.destroyItemsMenu();
                this.showAttacks();
            }
        }

        createAttacksMenu() {
            this.attackButtons = [
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(0))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this.encounterState)
                    .withClickFunction(this.encounterState.player.attack(0))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(1))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                    .withState(this.encounterState)
                    .withClickFunction(this.encounterState.player.attack(1))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(2))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(this.encounterState.player.attack(2))
                    .build(),
                ButtonBuilder.statefullButton()
                    .withText(this.determineAttackButtonText(3))
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(this.encounterState.player.attack(3))
                    .build()
            ];

            this.attackButtons.forEach(function (button, index) {
                button.inputEnabled = this.encounterState.player.hasAttackInSlot(index);
                button.visible = false;
            }, this);
        }

        private determineAttackButtonText(index: number) {
            if (this.encounterState.player.hasAttackInSlot(index)) {
                return this.encounterState.player.attacks[index].name;
            }
            return "-";
        }

        private openBag() {
            return () => {
                this.hideAttacks();
                this.createCurrentShownItems();
                this.itemPaginationNextButton.visible = this.encounterState.getAllPlayerItems().length > this.numberOfItemsPerPage;
            }
        }

        createItemPaginationButtons() {
            this.itemPaginationPreviousButton =
                ButtonBuilder.statelessButton()
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(((this.numberOfItemsPerPage - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(this.previousItems())
                    .withImageKey("paginationPrevious")
                    .build();
            this.itemPaginationNextButton =
                ButtonBuilder.statelessButton()
                    .withX((Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3) + 150)
                    .withY(((this.numberOfItemsPerPage - 1) * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT) + Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(this.nextItems())
                    .withImageKey("paginationNext")
                    .build();
            this.itemPaginationPreviousButton.visible = false;
            this.itemPaginationNextButton.visible = false
        }

        private previousItems() {
            return () => {
                this.destroyItemsMenu();
                this.currentItemsPage--;
                this.createCurrentShownItems();
                this.itemPaginationNextButton.visible = true;
                this.itemPaginationPreviousButton.visible = this.currentItemsPage !== 0;
            }
        }

        private nextItems() {
            return () => {
                this.destroyItemsMenu();
                this.currentItemsPage++;
                this.createCurrentShownItems();
                this.itemPaginationPreviousButton.visible = true;
                this.itemPaginationNextButton.visible = this.encounterState.getAllPlayerItems().length > (this.currentItemsPage * 5) + this.numberOfItemsPerPage;
            }
        }

        private destroyItemsMenu() {
            this.currentlyShownItems.forEach(function (item) {
                item.destroy();
            });
            this.currentlyShownItems = [];
            this.itemPaginationNextButton.visible = false;
            this.itemPaginationPreviousButton.visible = false;
        }

        private createCurrentShownItems() {
            var start = this.currentItemsPage * 5;
            let itemsToShow = this.encounterState.getPlayerItems(start, start + this.numberOfItemsPerPage);
            for (let i = 0; i < itemsToShow.length; i++) {
                let createdButton =
                    ButtonBuilder.statefullButton()
                        .withText(itemsToShow[i].name)
                        .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                        .withY(i * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                        .withState(this.encounterState)
                        .withClickFunction(this.useItem(itemsToShow[i]))
                        .build();
                this.currentlyShownItems.push(createdButton);
            }
        }

        private useItem(item: any) {
            //TODO: should call the 'use' method on the item object and remove it from the bag afterwards
            return function () {
                console.log("USED " + item.name);
            }
        }

        private useSpecial(specialButtonFunction: any) {
            return () => {
                this.hideAttacks();
                this.destroyItemsMenu();
                specialButtonFunction();
            }
        }
    }
}