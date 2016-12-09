///<reference path="Stats.ts"/>
    import {Stats} from "./Stats";
export interface BattleParticipant {
        isPlayerControlled(): boolean;
        getStats(): Stats;
    }