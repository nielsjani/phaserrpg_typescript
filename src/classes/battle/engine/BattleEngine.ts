///<reference path="./../../../states/encounterstate/EncounterState.ts"/>
///<reference path="../common/BattleParticipant.ts"/>

import {BattleParticipant} from "../common/BattleParticipant";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
export class BattleEngine {
    battleParticipants: BattleParticipant[] = [];
    betweenTurns: boolean = false;

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
}
