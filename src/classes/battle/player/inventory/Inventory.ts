import {InventoryItem} from "./InventoryItem";
import {EncounterState} from "../../../../states/encounterstate/EncounterState";
import {ObjectAmountMap} from "../../../util/ObjectAmountMap";
import {NotificationMessageWithCallback} from "../../common/NotificationMessageWithCallback";
export class Inventory {
    private items: ObjectAmountMap;

    constructor() {
        this.items = new ObjectAmountMap(this.itemEqualFunction());
    }

    addItem(item: InventoryItem) {
        if (this.items.has(item)) {
            this.items.set(item, this.items.get(item) + 1);
        } else {
            this.items.set(item, 1);
        }
    }

    useItem(item: InventoryItem, usageTarget: EncounterState): NotificationMessageWithCallback {
        let itemToUse = item.use(usageTarget);
        let numberOfItemsOfType = this.items.get(item);
        if (numberOfItemsOfType == 1) {
            this.items.remove(item);
        } else {
            this.items.set(item, numberOfItemsOfType - 1);
        }
        return itemToUse;
    }

    getItems(): InventoryItem[] {
        return Array.from(this.items.getAll().keys())
            .sort((item: InventoryItem, item2: InventoryItem) => {
                return item.getName() > item2.getName() ? 1 : -1;
            });
    }

    getAmountForItem(item: InventoryItem): number {
        return this.items.get(item);
    }

    private itemEqualFunction() {
        return (item: InventoryItem, item2: InventoryItem) => {
            return item.getName() === item2.getName();
        }
    }
}