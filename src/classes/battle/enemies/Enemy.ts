///<reference path="../common/Stats.ts"/>
///<reference path="../../../states/encounterstate/EncounterState.ts"/>
///<reference path="../common/BattleParticipant.ts"/>

import {BattleParticipant} from "../common/BattleParticipant";
import {Stats} from "../common/Stats";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
export abstract class Enemy implements BattleParticipant {
    public stats: Stats;
    private imageKey: string;

    constructor(stats: Stats, imageKey: string) {
        this.stats = stats;
        this.imageKey = imageKey;
    }

    public abstract performTurn(encounterState: EncounterState): void;

    public getImageKey(): string {
        return this.imageKey;
    }

    public isPlayerControlled(): boolean {
        return false;
    }

    getStats(): Stats {
        return this.stats;
    }

    public setStats(stats: Stats) {
        this.stats = stats;
    }

    public abstract getName(): string;
}