import {InventoryItem} from "./InventoryItem";
import {EncounterState} from "../../../../states/encounterstate/EncounterState";
import {NotificationMessageWithCallback} from "../../common/NotificationMessageWithCallback";
export class Potion implements InventoryItem {
    use(target: EncounterState): NotificationMessageWithCallback {
        return {
            message: "You regained 20 health by drinking the potion",
            callback: () => {
                target.getPlayerStats().heal(20);
            }
        }
    }

    getName(): string {
        return "Potion";
    }
}