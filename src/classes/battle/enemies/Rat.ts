///<reference path="./Enemy.ts"/>

namespace Classes {
    export class Rat extends Classes.Enemy {

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

        public performTurn(encounterState: States.EncounterState): void {
            //TODO: implement me
        };
    }
}