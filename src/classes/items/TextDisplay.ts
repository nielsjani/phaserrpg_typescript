///<reference path="../../states/GameState.ts"/>
///<reference path="../phaser_expansions/AbstractTextDisplay.ts"/>
import {AbstractTextDisplay} from "../phaser_expansions/AbstractTextDisplay";
import {GameState} from "../../states/GameState";
export class TextDisplay extends AbstractTextDisplay {

    constructor(public state: GameState, public x: number, public  y: number, public text: string) {
        super(state.game, x, y, text, TextDisplay.getStyle());
        this.setText(this.getFirstTextChunk(text));
        this.setTextBounds(state.camera.x + 25, state.camera.y + (state.camera.height - 150), 800, 100);
    }

    getStyle(): Phaser.PhaserTextStyle {
        return TextDisplay.getStyle();
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
