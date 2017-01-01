///<reference path="../src/classes/battle/common/NotificationTextService.ts"/>
///<reference path="../src/classes/battle/enemies/Enemy.ts"/>

import {Enemy} from "../src/classes/battle/enemies/Enemy";
import {NotificationTextService} from "../src/classes/battle/common/NotificationTextService";
import {TestEnemy} from "./stubs/TestEnemy";
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

    describe("playerAttacksText", () => {
        it('Correct text', () => {
            let battleStartText = new NotificationTextService().playerAttacksText("Tettekelek", new TestEnemy().withName("John"));
            expect(battleStartText).toEqual("You attacked John with Tettekelek");
        });
    })
});
