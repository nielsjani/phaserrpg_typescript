///<reference path="../src/classes/battle/common/NotificationTextService.ts"/>
///<reference path="../src/classes/battle/enemies/Enemy.ts"/>

import {TestEnemy} from "./battleengine.spec";
import {Enemy} from "../src/classes/battle/enemies/Enemy";
import {NotificationTextService} from "../src/classes/battle/common/NotificationTextService";
describe('NotificationTextService', () => {
    describe("battleStartText", () => {

        it('Correct text for one enemy', () => {
            let enemies: Enemy[] = [new TestEnemy().withName("John")];
            let battleStartText = new NotificationTextService().battleStartText(enemies);
            expect(battleStartText).toEqual("You were attacked by one John");
        });

        it('Correct text for multiple unique enemies', () => {
            let enemies: Enemy[] = [new TestEnemy().withName("John"), new TestEnemy().withName("Isaac")];
            let battleStartText = new NotificationTextService().battleStartText(enemies);
            expect(battleStartText).toEqual("You were attacked by one John and one Isaac");
        });

        it('Correct text for multiple non-unique enemies', () => {
            let enemies: Enemy[] = [new TestEnemy().withName("Isaac"), new TestEnemy().withName("John"), new TestEnemy().withName("Isaac")];
            let battleStartText = new NotificationTextService().battleStartText(enemies);
            expect(battleStartText).toEqual("You were attacked by 2 Isaac and one John");
        });
    });
});
