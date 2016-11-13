namespace Classes {
    export abstract class Enemy {
        constructor(private stats: Stats, private imageKey: string) {
        }

        public abstract performTurn(encounterState: States.EncounterState): void;

        public getImageKey(): string {
            return this.imageKey;
        }
    }
}