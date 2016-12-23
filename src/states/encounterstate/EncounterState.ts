///<reference path="../../classes/battle/player/Player.ts"/>
///<reference path="../../classes/battle/engine/BattleEngine.ts"/>
///<reference path="./EncounterStateMenuManager.ts"/>
///<reference path="./EncounterCharacter.ts"/>
///<reference path="../../classes/battle/common/NotificationTextService.ts"/>

import {Enemy} from "../../classes/battle/enemies/Enemy";
import {Player} from "../../classes/battle/player/Player";
import {BattleEngine} from "../../classes/battle/engine/BattleEngine";
import {NotificationTextService} from "../../classes/battle/common/NotificationTextService";
import {EncounterCharacter, EncounterCharacterBuilder} from "./EncounterCharacter";
import {EncounterStateMenuManager} from "./EncounterStateMenuManager";
export class EncounterState extends Phaser.State {
    possibleEnemies: Enemy[];
    private state: Phaser.State;
    player: Player;
    private encounterStateMenuManager: EncounterStateMenuManager;
    private battleEngine: BattleEngine;

    private playerGraphic: EncounterCharacter;
    private rat1Graphic: EncounterCharacter;
    private rat2Graphic: EncounterCharacter;
    private rat3Graphic: EncounterCharacter;
    private notificationTextService: NotificationTextService = new NotificationTextService();
    spacebar: Phaser.Key;

    //TODO: display health/MP
    //TODO: information textbox with text that describes when something has happened
    //TODO: turn-based
    //TODO: make buttons less high, so battlefield has more room?

    init(possibleEnemies: Enemy[], state: Phaser.State, player: Player) {
        this.possibleEnemies = possibleEnemies;
        this.state = state;
        this.player = player;

        this.battleEngine = new BattleEngine(this);
    }

    private renderBattlefield() {
//TODO: Move to StateMenuManager? Or Create StateBattlefieldManager?
        this.playerGraphic = EncounterCharacterBuilder.encounterCharacter()
            .withState(this)
            .withX(290)
            .withY(210)
            .withImageKey("player_backsprite")
            .withImageHeight(165)
            .build();
        this.rat1Graphic = EncounterCharacterBuilder.encounterCharacter()
            .withState(this)
            .withX(10)
            .withY(5)
            .withImageKey(this.possibleEnemies[0].getImageKey())
            .withImageHeight(180)
            .build();
        this.rat2Graphic = EncounterCharacterBuilder.encounterCharacter()
            .withState(this)
            .withX(290)
            .withY(5)
            .withImageKey(this.possibleEnemies[0].getImageKey())
            .withImageHeight(180)
            .build();
        this.rat3Graphic = EncounterCharacterBuilder.encounterCharacter()
            .withState(this)
            .withX(570)
            .withY(5)
            .withImageKey(this.possibleEnemies[0].getImageKey())
            .withImageHeight(180)
            .build();
    }

    create() {
        this.encounterStateMenuManager = new EncounterStateMenuManager(this);
        this.encounterStateMenuManager.createBaseMenu(this.useSpecial(this), this.flee);
        this.encounterStateMenuManager.createAttacksMenu();
        this.encounterStateMenuManager.createItemPaginationButtons();
        this.renderBattlefield();
        this.showNotification(this.notificationTextService.battleStartText(this.possibleEnemies));
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update() {
        this.playerGraphic.decrementHealthBarUntil(this.player.playerStats.getPercentHealthRemaining());
        this.encounterStateMenuManager.update();
    }


    private useSpecial(context: EncounterState) {
        return () => {
            console.log("I'm special!");
            context.player.playerStats.currenthealth -= 10;
        }
    }

    private flee() {
        //TODO: encounterstate needs to know the map and tileset and x/y to return to
        this.game.state.start('LoadState', false, false, "mymap1", "MyTileset");
    }

    getPlayerItems(start: number, end: number) {
        return this.player.items.slice(start, end);
    }

    getAllPlayerItems() {
        return this.player.items;
    }

    getPlayerStats() {
        return this.player.playerStats;
    }

    getEnemies() {
        return this.possibleEnemies;
    }

    getPlayer() {
        return this.player;
    }

    private showNotification(text: string) {
        this.encounterStateMenuManager.addNotification(text);
    }
}

