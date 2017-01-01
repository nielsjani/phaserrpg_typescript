///<reference path="../common/BattleParticipant.ts"/>
import {Stats, StatsBuilder} from "../common/Stats";
import {BattleParticipant} from "../common/BattleParticipant";
import {GameState} from "../../../states/GameState";
import {Enemy} from "../enemies/Enemy";
import {Inventory} from "./inventory/Inventory";
import {Potion} from "./inventory/Potion";
import {AngelicShield} from "./inventory/AngelicShield";
import {InventoryItem} from "./inventory/InventoryItem";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
import {NotificationMessageWithCallback} from "../common/NotificationMessageWithCallback";
export class Player extends Phaser.Sprite implements BattleParticipant {

    idlePoses: Map<string, number>;
    lastDirection: string;
    playerStats: Stats;
    attacks: any[];
    inventory: Inventory = new Inventory();

    constructor(public state: GameState, public x: number, public y: number, public imageRef: string) {
        super(state.game, x, y, imageRef);

        this.state = state;

        this.animations.add('left', [0, 1, 2], 10, true);
        this.animations.add('right', [3, 4, 5], 10, true);
        this.animations.add('down', [6, 7, 8], 10, true);
        this.animations.add('up', [9, 10, 11], 10, true);
        this.state.physics.arcade.enable(this);
        this.createIdlePoses();
        this.createPlayerStats();
        this.attacks = [{name: "Bite", power: 10}, {name: "Scratch", power: 15}, {name: "Weep", power: 0}];

        this.fillInventory();
        // this.items = [
        //     {name: "Potion", amount: 5},
        //     {name: "Smoke bomb", amount: 2},
        //     {name: "X marker", amount: 1},
        //     {name: "X attacker", amount: 1},
        //     {name: "X defender", amount: 1},
        //     {name: "Pokéball", amount: 1},
        //     {name: "Link's sword", amount: 1},
        //     {name: "???", amount: 1},
        //     {name: "Mattress", amount: 1},
        //     {name: "Bowl of pee", amount: 1},
        //     {name: "Eleven", amount: 1}
        // ];
        // this.orderItems();
    }

    private createPlayerStats() {
        this.playerStats = new StatsBuilder().stats()
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
            } else if (this.state.cursors.right.isDown) {
                this.body.velocity.x += 600;
                this.animations.play("right");
                this.lastDirection = "right";
            } else if (this.state.cursors.up.isDown) {
                this.body.velocity.y -= 600;
                this.animations.play("up");
                this.lastDirection = "up";
            } else if (this.state.cursors.down.isDown) {
                this.body.velocity.y += 600;
                this.animations.play("down");
                this.lastDirection = "down";
            } else {
                this.animations.stop();
                this.frame = this.lastDirection ? this.idlePoses.get(this.lastDirection) : 7;
            }
        }
    }

    hasAttackInSlot(index: number) {
        return this.attacks.length - 1 >= index;
    };

    attack(index: number, enemy: Enemy) {
        let playerAttacks = this.attacks;
        enemy.processAttacked(playerAttacks[index].power);
    }

    // private orderItems() {
    //     this.items.sort(function (item, item2) {
    //         return item.name > item2.name ? 1 : -1;
    //     });
    // }

    public isPlayerControlled(): boolean {
        return true;
    }


    getStats(): Stats {
        return this.playerStats;
    }

    //TODO: temp, until player can acquire items
    private fillInventory() {
        this.inventory.addItem(new Potion());
        this.inventory.addItem(new Potion());
        this.inventory.addItem(new Potion());
        this.inventory.addItem(new AngelicShield());
    }

    useItem(item: InventoryItem, encounterState: EncounterState): NotificationMessageWithCallback {
        return this.inventory.useItem(item, encounterState);
    }
}
