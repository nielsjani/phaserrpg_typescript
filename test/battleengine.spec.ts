///<reference path="../src/classes/battle/enemies/Enemy.ts"/>
///<reference path="../src/classes/battle/engine/BattleEngine.ts"/>
///<reference path="../src/classes/battle/common/Stats.ts"/>
///<reference path="../src/states/encounterstate/EncounterState.ts"/>
/// <reference path="./config/typings/jasmine.d.ts" />

import {BattleEngine} from "../src/classes/battle/engine/BattleEngine";
import {StatsBuilder, Stats} from "../src/classes/battle/common/Stats";
import {Enemy} from "../src/classes/battle/enemies/Enemy";
import {EncounterState} from "../src/states/encounterstate/EncounterState";

describe('BattleEngine', () => {

    function mockState(playerSpeed: number, enemies: Enemy[]) {
        let state = jasmine.createSpyObj("encounterState", ["getPlayer", "getEnemies"]);
        state.getPlayer.and.returnValue({
            getStats: () => {
                return new StatsBuilder()
                    .stats()
                    .withSpeed(playerSpeed)
                    .build()
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
            let battleEngine: BattleEngine = new BattleEngine(state);

            expect(battleEngine.battleParticipants.length).toBe(4);
            expect(battleEngine.battleParticipants[0].getStats().speed).toBe(8);
            expect(battleEngine.battleParticipants[1].getStats().speed).toBe(5);
            expect(battleEngine.battleParticipants[2].getStats().speed).toBe(4);
            expect(battleEngine.battleParticipants[3].getStats().speed).toBe(3);
        });

        it('Same speed -> Player goes first', () => {
            let state = mockState(4, [enemyWithSpeed(4)]);
            let battleEngine: BattleEngine = new BattleEngine(state);

            expect(battleEngine.battleParticipants.length).toBe(2);
            expect(battleEngine.battleParticipants[0].isPlayerControlled()).toBeTruthy();
            expect(battleEngine.battleParticipants[1].isPlayerControlled()).toBeFalsy();
        });
    });
});

function enemyWithSpeed(speed: number) {
    return new TestEnemy().withStats(new StatsBuilder().stats().withSpeed(speed).build());
}

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

    withStats(stats: Stats){
        super.setStats(stats);
        return this;
    }
}