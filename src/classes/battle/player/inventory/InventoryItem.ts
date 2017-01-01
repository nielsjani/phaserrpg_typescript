import {EncounterState} from "../../../../states/encounterstate/EncounterState";
import {NotificationMessageWithCallback} from "../../common/NotificationMessageWithCallback";
export interface  InventoryItem {
    use(target: EncounterState): NotificationMessageWithCallback;
    getName(): string

}