import {InventoryItem} from "./InventoryItem";
import {EncounterState} from "../../../../states/encounterstate/EncounterState";
import {NotificationMessageWithCallback} from "../../common/NotificationMessageWithCallback";
export class AngelicShield implements InventoryItem {

    use(target: EncounterState): NotificationMessageWithCallback {
        return {
            message: "You are protected from all damage for the next turn. (As soon as I implement it)",
            callback: () => {
                //TODO
            }
        }
    }

    getName(): string {
        return "Angelic Shield";
    }
}