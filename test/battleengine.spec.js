var BattleEngine = Battle.BattleEngine;
var Enemy = Classes.Enemy;
var StatsBuilder = Classes.StatsBuilder;
describe('BattleEngine', () => {
    function mockState(playerSpeed, enemies) {
        let state = jasmine.createSpyObj("encounterState", ["getPlayer", "getEnemies"]);
        state.getPlayer.and.returnValue({
            getStats: () => {
                return new StatsBuilder()
                    .stats()
                    .withSpeed(playerSpeed)
                    .build();
            },
            isPlayerControlled: () => {
                return true;
            }
        });
        state.getEnemies.and.returnValue(enemies);
        return state;
    }
    describe('battleParticipants ordering', () => {
        it('Based on speed', () => {
            let state = mockState(4, [enemyWithSpeed(3), enemyWithSpeed(5), enemyWithSpeed(8)]);
            let battleEngine = new BattleEngine(state);
            expect(battleEngine.battleParticipants.length).toBe(4);
            expect(battleEngine.battleParticipants[0].getStats().speed).toBe(8);
            expect(battleEngine.battleParticipants[1].getStats().speed).toBe(5);
            expect(battleEngine.battleParticipants[2].getStats().speed).toBe(4);
            expect(battleEngine.battleParticipants[3].getStats().speed).toBe(3);
        });
        it('Same speed -> Player goes first', () => {
            let state = mockState(4, [enemyWithSpeed(4)]);
            let battleEngine = new BattleEngine(state);
            expect(battleEngine.battleParticipants.length).toBe(2);
            expect(battleEngine.battleParticipants[0].isPlayerControlled()).toBeTruthy();
            expect(battleEngine.battleParticipants[1].isPlayerControlled()).toBeFalsy();
        });
    });
});
function enemyWithSpeed(speed) {
    return new TestEnemy().withStats(new StatsBuilder().stats().withSpeed(speed).build());
}
export class TestEnemy extends Enemy {
    constructor() {
        super(new StatsBuilder().stats().build(), "key");
    }
    performTurn(encounterState) {
    }
    getName() {
        return this.name;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withStats(stats) {
        super.stats = stats;
        return this;
    }
}
//# sourceMappingURL=battleengine.spec.js.map