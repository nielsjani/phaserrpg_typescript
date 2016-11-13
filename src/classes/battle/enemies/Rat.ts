namespace Classes {
    export class Rat extends Enemy {

        constructor(stats: Stats, imageKey: string) {
            super(stats, imageKey);
        }

        public performTurn(encounterState: States.EncounterState): void {
            //TODO: implement me
        };
    }
}