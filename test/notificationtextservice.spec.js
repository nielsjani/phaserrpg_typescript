var NotificationTextService = Battle.NotificationTextService;
import { TestEnemy } from "./battleengine.spec";
describe('NotificationTextService', () => {
    describe("battleStartText", () => {
        it('Correct text for one enemy', () => {
            let enemies = [new TestEnemy().withName("John")];
            let battleStartText = new NotificationTextService().battleStartText(enemies);
            expect(battleStartText).toEqual("You were attacked by a John");
        });
    });
});
//# sourceMappingURL=notificationtextservice.spec.js.map