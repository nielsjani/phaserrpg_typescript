import {EncounterState} from "../../../../states/encounterstate/EncounterState";
export interface  InventoryItem {
    use(target: EncounterState): void;
    getName(): string

}