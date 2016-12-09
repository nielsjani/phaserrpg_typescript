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
            expect(battleStartText).toEqual("You were attacked by a John");
        });
    });
});
