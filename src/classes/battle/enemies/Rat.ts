///<reference path="./Enemy.ts"/>

import {Enemy} from "./Enemy";
import {StatsBuilder} from "../common/Stats";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
export class Rat extends Enemy {

    constructor() {
        super(Rat.createRatStats(), "rat");
    }

    private static createRatStats() {
        return new StatsBuilder()
            .stats()
            .withMaxhealth(100)
            .withMaxmana(0)
            .withAttack(1)
            .withDefense(2)
            .withSpeed(5)
            .build();
    }

    public performTurn(encounterState: EncounterState): void {
        let callback = () => {
            encounterState.getPlayerStats().damage(10);
        };
        encounterState.showNotificationWithCallback("The rat bit you!", callback);
    };

    public getName(): string {
        return "Rat";
    }
}