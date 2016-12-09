///<reference path="../../phaser_expansions/AbstractTextDisplay.ts"/>
import {TextDisplay} from "../../items/TextDisplay";
import {AbstractTextDisplay} from "../../phaser_expansions/AbstractTextDisplay";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
export class StaticTextDisplay extends AbstractTextDisplay {
    //https://phaser.io/examples/v2/text/display-text-word-by-word

    constructor(public state: EncounterState, public x: number, public  y: number, public text: string) {
        super(state.game, x, y, text, TextDisplay.getStyle());
        this.setText(this.getFirstTextChunk(text));
        // this.setTextBounds(state.camera.x  +25, state.camera.y + (state.camera.height - 150), 800, 100);
    }

    getStyle(): Phaser.PhaserTextStyle {
        return StaticTextDisplay.getStyle();
    }

    static getStyle() {
        return {
            align: "left",
            font: 'bold 24pt Arial',
            fill: 'white',
            wordWrap: true,
            wordWrapWidth: 750,
            backgroundColor: "blue",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
    }
}
