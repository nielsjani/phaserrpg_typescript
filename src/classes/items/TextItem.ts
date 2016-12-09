///<reference path="../items/TextDisplay.ts"/>
///<reference path="../../states/GameState.ts"/>
///<reference path="../items/Item.ts"/>


import {Item} from "./Item";
import {TextDisplay} from "./TextDisplay";
import {GameState} from "../../states/GameState";
export class TextItem implements Item {
    collides: boolean;

    constructor(public x: number, public y: number, public sprite: string, public text: string) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.text = text;
        this.collides = true;
    }

    getCustomProperties() {
        return {
            text: this.text,
            collides: this.collides,
            handleOverlap: this.handleOverlap
        }
    }

    handleOverlap(state: GameState) {
        if (state.spacebar.justDown) {
            if (!state.displayingText) {
                state.currentlyDisplayedText = new TextDisplay(state, 0, 0, this.text);
                state.add.existing(state.currentlyDisplayedText);
                state.displayingText = true;
            } else if (state.currentlyDisplayedText.hasMore()) {
                state.currentlyDisplayedText.updateTextbox();
            } else {
                state.currentlyDisplayedText.destroy();
                state.displayingText = false;
            }
        }
    }
}
