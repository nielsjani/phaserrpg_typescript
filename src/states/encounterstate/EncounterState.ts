///<reference path="../../classes/battle/player/Player.ts"/>
///<reference path="../../classes/battle/engine/BattleEngine.ts"/>
///<reference path="./EncounterStateMenuManager.ts"/>
///<reference path="./EncounterCharacter.ts"/>
///<reference path="../../classes/battle/common/NotificationTextService.ts"/>
import {Enemy} from "../../classes/battle/enemies/Enemy";
import {Player} from "../../classes/battle/player/Player";
import {NotificationTextService} from "../../classes/battle/common/NotificationTextService";
import {EncounterCharacter, EncounterCharacterBuilder} from "./EncounterCharacter";
import {EncounterStateMenuManager} from "./EncounterStateMenuManager";
import {Rat} from "../../classes/battle/enemies/Rat";
import {InventoryItem} from "../../classes/battle/player/inventory/InventoryItem";
import {NotificationMessageWithCallback} from "../../classes/battle/common/NotificationMessageWithCallback";
export class EncounterState extends Phaser.State {
    possibleEnemies: Enemy[];
    private state: Phaser.State;
    player: Player;
    private encounterStateMenuManager: EncounterStateMenuManager;

    private playerGraphic: EncounterCharacter;
    private enemy1Graphic: EncounterCharacter;
    private enemy2Graphic: EncounterCharacter;
    private enemy3Graphic: EncounterCharacter;
    private notificationTextService: NotificationTextService = new NotificationTextService();
    spacebar: Phaser.Key;

    //TODO: display health/MP
    //TODO: information textbox with text tha²t describes when something has happened
    //TODO: turn-based
    //TODO: make buttons less high, so battlefield has more room?

    init(possibleEnemies: Enemy[], state: Phaser.State, player: Player) {
        // this.possibleEnemies = possibleEnemies;
        this.possibleEnemies = [new Rat(), new Rat()];
        this.state = state;
        this.player = player;
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
        this.enemy1Graphic = EncounterCharacterBuilder.encounterCharacter()
            .withState(this)
            .withX(10)
            .withY(5)
            .withImageKey(this.possibleEnemies[0].getImageKey())
            .withImageHeight(180)
            .build();
        if (this.possibleEnemies[1]) {
            this.enemy2Graphic = EncounterCharacterBuilder.encounterCharacter()
                .withState(this)
                .withX(290)
                .withY(5)
                .withImageKey(this.possibleEnemies[1].getImageKey())
                .withImageHeight(180)
                .build();
        }
        if (this.possibleEnemies[2]) {
            this.enemy3Graphic = EncounterCharacterBuilder.encounterCharacter()
                .withState(this)
                .withX(570)
                .withY(5)
                .withImageKey(this.possibleEnemies[2].getImageKey())
                .withImageHeight(180)
                .build();
        }
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
        this.playerGraphic.changeHealthBarUntil(this.player.playerStats.getPercentHealthRemaining());
        this.updateEnemyHealthbarIfPresent(this.enemy1Graphic, 0);
        this.updateEnemyHealthbarIfPresent(this.enemy2Graphic, 1);
        this.updateEnemyHealthbarIfPresent(this.enemy3Graphic, 2);
        this.encounterStateMenuManager.update();
    }


    private useSpecial(context: EncounterState): ()=>NotificationMessageWithCallback {
       return () => {
           let random = Math.floor(Math.random() * 10);
           let message = "Your special move backfired!";
           if (random >= 5) {
               message = "Your special move healed you!"
           }

           return {
               message: message,
               callback: () => {
                   random >= 5 ?
                       context.player.playerStats.heal(10) :
                       context.player.playerStats.damage(10);
               }
           }
       }
    }

    private flee() {
        //TODO: encounterstate needs to know the map and tileset and x/y to return to
        this.game.state.start('LoadState', false, false, "mymap1", "MyTileset");
    }

    getPlayerItems(start: number, end: number): InventoryItem[] {
        return this.getAllPlayerItems().slice(start, end);
    }

    getAllPlayerItems() {
        return this.player.inventory.getItems();
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

    showNotificationWithCallback(text: string, callback: ()=>any) {
        this.encounterStateMenuManager.addNotificationWithCallback(text, callback);
    }

    playerAttackCallback(attackIndex: number, enemyIndex: number) {
        return () => {
            this.player.attack(attackIndex, this.getEnemies()[enemyIndex]);
        }
    }

    private updateEnemyHealthbarIfPresent(enemyGraphic: EncounterCharacter, enemyIndex: number) {
        if (this.getEnemies().length >= enemyIndex && this.getEnemies()[enemyIndex]) {
            enemyGraphic.decrementHealthBarUntil(this.getEnemies()[enemyIndex].getStats().getPercentHealthRemaining());
        }
    }

}

