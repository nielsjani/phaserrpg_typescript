///<reference path="../src/classes/battle/common/NotificationTextService.ts"/>
///<reference path="../src/classes/battle/enemies/Enemy.ts"/>
import {Inventory} from "../src/classes/battle/player/inventory/Inventory";
import {Potion} from "../src/classes/battle/player/inventory/Potion";
import {AngelicShield} from "../src/classes/battle/player/inventory/AngelicShield";
describe('Inventory', () => {
    describe("addItem", () => {

        it('New item added to map', () => {
            let inventory = new Inventory();
            let item = new Potion();
            inventory.addItem(item);

            expect(inventory.getItems().indexOf(item)).toBeGreaterThan(-1);
            expect(inventory.getAmountForItem(item)).toBe(1);
        });

        it('Differents items assigned different keys', () => {
            let inventory = new Inventory();
            let item = new Potion();
            let item2 = new AngelicShield();
            inventory.addItem(item);
            inventory.addItem(item2);

            expect(inventory.getItems().indexOf(item)).toBeGreaterThan(-1);
            expect(inventory.getAmountForItem(item)).toBe(1);

            expect(inventory.getItems().indexOf(item2)).toBeGreaterThan(-1);
            expect(inventory.getAmountForItem(item2)).toBe(1);
        });

        it('Same item added multiple times', () => {
            let inventory = new Inventory();
            let potion = new Potion();
            let item2 = new AngelicShield();
            let potion2 = new Potion();
            inventory.addItem(potion);
            inventory.addItem(item2);
            inventory.addItem(potion2);

            expect(inventory.getItems().indexOf(potion)).toBeGreaterThan(-1);
            expect(inventory.getAmountForItem(potion)).toBe(2);

            expect(inventory.getItems().indexOf(item2)).toBeGreaterThan(-1);
            expect(inventory.getAmountForItem(item2)).toBe(1);
        });

    });

    describe("useItem", () => {

        let mockEncounterState = jasmine.createSpyObj("encounterState", ["getPlayer"]);

        it('Only one -> removes item', () => {
            let inventory = new Inventory();
            let item = new Potion();
            inventory.addItem(item);

            inventory.useItem(item, mockEncounterState);

            expect(inventory.getItems().indexOf(item)).toBe(-1);
        });

        it('More than one -> decrement amount by one', () => {
            let inventory = new Inventory();
            let item = new Potion();
            let item2 = new Potion();
            inventory.addItem(item);
            inventory.addItem(item2);

            expect(inventory.getAmountForItem(item)).toBe(2);

            inventory.useItem(item, mockEncounterState);

            expect(inventory.getItems().indexOf(item)).toBeGreaterThan(-1);
            expect(inventory.getAmountForItem(item)).toBe(1);
        });

    });

});
