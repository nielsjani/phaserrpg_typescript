import {InventoryItem} from "./InventoryItem";
import {EncounterState} from "../../../../states/encounterstate/EncounterState";
export class AngelicShield implements InventoryItem {
    use(target: EncounterState): void {
    }

    getName(): string {
        return "Angelic Shield";
    }
}