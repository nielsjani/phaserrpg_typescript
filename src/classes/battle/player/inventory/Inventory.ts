import {InventoryItem} from "./InventoryItem";
import {EncounterState} from "../../../../states/encounterstate/EncounterState";
export class Inventory {
    private items: Map<InventoryItem, number> = new Map();

    addItem(item: InventoryItem) {
        if (this.isAlreadyInInventory(item)) {
            let currentValue = this.items.get(this.getItemKey(item.getName()));
            this.items.set(this.getItemKey(item.getName()), currentValue + 1);
        } else {
            this.items.set(item, 1);
        }
    }

    private isAlreadyInInventory(item: InventoryItem) {
        return this.getItemKey(item.getName());
    }

    private getItemKey(itemName: string) {
        return Array.from(this.items.keys()).filter(inventoryItem => inventoryItem.getName() === itemName)[0];
    }

    useItem(item: InventoryItem, usageTarget: EncounterState) {

    }

    getItems() {
        return this.items;
    }
}