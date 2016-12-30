import {InventoryItem} from "./InventoryItem";
import {EncounterState} from "../../../../states/encounterstate/EncounterState";
export class Potion implements InventoryItem {
    use(target: EncounterState): void {
    }

    getName(): string {
        return "Potion";
    }
}