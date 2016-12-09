var Battle;
(function (Battle) {
    class BattleEngine {
        constructor(encounterState) {
            this.encounterState = encounterState;
            this.battleParticipants = [];
            this.betweenTurns = false;
            this.determineTurnOrder();
        }
        determineTurnOrder() {
            this.battleParticipants.push(this.encounterState.getPlayer());
            this.encounterState.getEnemies().forEach(enemy => this.battleParticipants.push(enemy));
            this.battleParticipants.sort((bp1, bp2) => {
                return bp2.getStats().speed - bp1.getStats().speed;
            });
        }
    }
    Battle.BattleEngine = BattleEngine;
})(Battle || (Battle = {}));
//# sourceMappingURL=BattleEngine.js.map