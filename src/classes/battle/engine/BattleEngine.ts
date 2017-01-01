///<reference path="./../../../states/encounterstate/EncounterState.ts"/>
///<reference path="../common/BattleParticipant.ts"/>

import {BattleParticipant} from "../common/BattleParticipant";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
import {EncounterStateMenuManager} from "../../../states/encounterstate/EncounterStateMenuManager";
import {NotificationTextService} from "../common/NotificationTextService";
import {Enemy} from "../enemies/Enemy";
import {Player} from "../player/Player";
export class BattleEngine {
    battleParticipants: BattleParticipant[] = [];
    battleParticipantsForCurrentTurn: BattleParticipant[] = [];
    private playerTurnCallback: any;
    private currentAttackerIndex: number;

    constructor(private encounterState: EncounterState) {
        this.determineTurnOrder();
    }

    private determineTurnOrder() {
        this.battleParticipants.push(this.encounterState.getPlayer());
        this.encounterState.getEnemies().forEach(enemy => this.battleParticipants.push(enemy));

        this.battleParticipants.sort((bp1, bp2) => {
            return bp2.getStats().speed - bp1.getStats().speed;
        });
    }

    startBattlePhase(playerAttackCallback: any) {
        this.battleParticipantsForCurrentTurn = this.battleParticipants;
        this.playerTurnCallback = playerAttackCallback;
        this.currentAttackerIndex = 0;
        this.performAttack(this.currentAttackerIndex);
    }

    startBattlePhaseWithout(player: Player) {
        this.battleParticipantsForCurrentTurn = this.battleParticipants;
        this.removePlayerFromCurrentTurn(player);
        this.currentAttackerIndex = 0;
    }

    private removePlayerFromCurrentTurn(player: Player) {
        this.battleParticipantsForCurrentTurn = this.battleParticipantsForCurrentTurn.filter(entity => entity !== player);
    }

    private performAttack(battleParticipantIndex: number) {
        let currentAttacker: BattleParticipant = this.battleParticipantsForCurrentTurn[battleParticipantIndex];
        if(currentAttacker.isPlayerControlled()){
            this.playerTurnCallback();
        } else {
            let enemy: Enemy = currentAttacker as Enemy;
            enemy.performTurn(this.encounterState);
        }
        this.currentAttackerIndex++;
    }

    nextAttack() {
        this.performAttack(this.currentAttackerIndex);
    }

    isBattlePhaseInProgress() {
        return this.battleParticipantsForCurrentTurn[this.currentAttackerIndex] !== undefined;
    }
}
