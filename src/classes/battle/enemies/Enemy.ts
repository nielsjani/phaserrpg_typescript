///<reference path="../common/Stats.ts"/>
///<reference path="../../../states/encounterstate/EncounterState.ts"/>

namespace Classes {
    export abstract class Enemy {
        stats: Stats;
        private imageKey: string;

        constructor(stats: Stats, imageKey: string) {
            this.stats = stats;
            this.imageKey = imageKey;
        }

        public abstract performTurn(encounterState: States.EncounterState): void;

        public getImageKey(): string {
            return this.imageKey;
        }
    }
}