var Classes;
(function (Classes) {
    class Rat extends Classes.Enemy {
        constructor() {
            super(Rat.createRatStats(), "rat");
        }
        static createRatStats() {
            return new Classes.StatsBuilder()
                .stats()
                .withMaxhealth(100)
                .withMaxmana(0)
                .withAttack(1)
                .withDefense(2)
                .withSpeed(5)
                .build();
        }
        performTurn(encounterState) {
        }
        ;
        getName() {
            return "Rat";
        }
    }
    Classes.Rat = Rat;
})(Classes || (Classes = {}));
//# sourceMappingURL=Rat.js.map