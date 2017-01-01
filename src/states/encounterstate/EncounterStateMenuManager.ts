///<reference path="../../classes/util/Constants.ts"/>
///<reference path="../../classes/phaser_expansions/ButtonBuilder.ts"/>

import {ButtonBuilder} from "../../classes/phaser_expansions/ButtonBuilder";
import {Constants} from "../../classes/util/Constants";
import {EncounterState} from "./EncounterState";
import {StaticTextDisplay} from "../../classes/battle/common/StaticTextDisplay";
import {BattleEngine} from "../../classes/battle/engine/BattleEngine";
import {NotificationTextService} from "../../classes/battle/common/NotificationTextService";
import {InventoryItem} from "../../classes/battle/player/inventory/InventoryItem";
import {NotificationMessageWithCallback} from "../../classes/battle/common/NotificationMessageWithCallback";
export class EncounterStateMenuManager {
    private encounterState: EncounterState;
    private mainMenu: Phaser.Button[];
    private attackButtons: Phaser.Button[];

    private currentItemsPage: number = 0;
    private numberOfItemsPerPage: number = 5;

    private itemPaginationPreviousButton: Phaser.Button;
    private itemPaginationNextButton: Phaser.Button;
    private currentlyShownItems: Phaser.Button[] = [];
    private notification: StaticTextDisplay;

    private battleEngine: BattleEngine;


    constructor(private state: EncounterState) {
        this.encounterState = state;
        this.battleEngine = new BattleEngine(state);
    }

    createBaseMenu(specialButtonFunction: () => NotificationMessageWithCallback, fleeButtonFunction: any) {
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
                .withClickFunction(this.useFlee(fleeButtonFunction))
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
                .withClickFunction(this.performAttack(0))
                .build(),
            ButtonBuilder.statefullButton()
                .withText(this.determineAttackButtonText(1))
                .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                .withY(Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2))
                .withState(this.encounterState)
                .withClickFunction(this.performAttack(1))
                .build(),
            ButtonBuilder.statefullButton()
                .withText(this.determineAttackButtonText(2))
                .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 2)
                .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                .withState(this.encounterState)
                .withClickFunction(this.performAttack(2))
                .build(),
            ButtonBuilder.statefullButton()
                .withText(this.determineAttackButtonText(3))
                .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                .withY(Constants.GAME_HEIGHT - Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                .withState(this.encounterState)
                .withClickFunction(this.performAttack(3))
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
        //TODO: show amount of owned of itemtype (Eg: Potion x5)
        var start = this.currentItemsPage * 5;
        let itemsToShow = this.encounterState.getPlayerItems(start, start + this.numberOfItemsPerPage);
        for (let i = 0; i < itemsToShow.length; i++) {
            let createdButton =
                ButtonBuilder.statefullButton()
                    .withText(itemsToShow[i].getName())
                    .withX(Constants.ENCOUNTER_MENU_BUTTON_WIDTH * 3)
                    .withY(i * Constants.ENCOUNTER_MENU_BUTTON_HEIGHT)
                    .withState(this.encounterState)
                    .withClickFunction(this.useItem(itemsToShow[i], this.encounterState))
                    .build();
            this.currentlyShownItems.push(createdButton);
        }
    }

    private useItem(item: InventoryItem, encounterState: EncounterState) {
        return () => {
            console.log("USED " + item.getName());
            this.hideMenus();
            let notificationMessageWithCallback = encounterState.getPlayer().useItem(item, encounterState);
            this.addNotificationWithCallback(notificationMessageWithCallback.message, () => {
                notificationMessageWithCallback.callback();
               this.battleEngine.startBattlePhaseWithout(this.encounterState.player);
            });
            //TODO: notification + start battle phase (like special)
            //TODO: disable item button if inventory empty?
        }
    }

    private useSpecial(specialButtonFunction: () => NotificationMessageWithCallback) {
        return () => {
            this.hideMenus();
            let spBFunction = specialButtonFunction();
            this.addNotificationWithCallback(spBFunction.message, () => {
                spBFunction.callback();
                this.battleEngine.startBattlePhaseWithout(this.encounterState.player);
            });
        }
    }

    addNotification(text: string) {
        this.addNotificationWithCallback(text, undefined);
    }

    addNotificationWithCallback(text: string, callback: any) {
        this.notification = new StaticTextDisplay(this.encounterState, 0, 0, text, Constants.GAME_HEIGHT - (Constants.ENCOUNTER_MENU_BUTTON_HEIGHT * 2), Constants.GAME_WIDTH, callback);
        this.encounterState.add.existing(this.notification);
        this.hideMenus();
    }

    update() {
        if (this.encounterState.spacebar.justDown) {
            if (this.notification) {
                this.handleTextDisplayNextText();
            }
        }
    }

    private handleTextDisplayNextText() {
        if (this.notification.hasMore()) {
            this.notification.updateTextbox();
        } else {
            if (this.notification.hasCallback()) {
                this.notification.performCallback();
            }
            this.notification.destroy();
            this.notification = undefined;

            if (this.battleEngine.isBattlePhaseInProgress()) {
                this.battleEngine.nextAttack();
            } else {
                this.showMainMenu();
            }
        }
    }

    private hideMenus() {
        this.hideMainMenu();
        this.hideAttacks();
        this.destroyItemsMenu();
    }

    private hideMainMenu() {
        this.mainMenu.forEach(mainMenuButton => mainMenuButton.visible = false);
    }

    private showMainMenu() {
        this.mainMenu.forEach(mainMenuButton => mainMenuButton.visible = true);
    }

    private performAttack(attackIndex: number) {
        return () => {
            //TODO: player decides on target for attack after selecting attack.
            let playerTurnCallback = () => {
                let playerAttacksText = new NotificationTextService().playerAttacksText(this.encounterState.player.attacks[attackIndex].name, this.encounterState.getEnemies()[0]);
                this.addNotificationWithCallback(playerAttacksText, this.encounterState.playerAttackCallback(attackIndex, 0));
            };

            this.battleEngine.startBattlePhase(playerTurnCallback);
        }
    }

    private useFlee(fleeButtonFunction: ()=>any) {
        //TODO: fleeing can fail sometimes?
        return () => {
            this.addNotificationWithCallback("You fled the battle", fleeButtonFunction);
        }
    }
}