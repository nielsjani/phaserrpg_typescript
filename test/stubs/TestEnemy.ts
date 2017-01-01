
import {Enemy} from "../../src/classes/battle/enemies/Enemy";
import {StatsBuilder, Stats} from "../../src/classes/battle/common/Stats";
import {EncounterState} from "../../src/states/encounterstate/EncounterState";
export class TestEnemy extends Enemy {

    private name: string;

    constructor() {
        super(new StatsBuilder().stats().build(), "key");
    }


    performTurn(encounterState: EncounterState): void {
    }

    getName(): string {
        return this.name;
    }

    withName(name: string) {
        this.name = name;
        return this;
    }

    withStats(stats: Stats) {
        super.setStats(stats);
        return this;
    }
}