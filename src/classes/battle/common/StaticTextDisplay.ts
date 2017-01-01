import {AbstractTextDisplay} from "../../phaser_expansions/AbstractTextDisplay";
import {EncounterState} from "../../../states/encounterstate/EncounterState";
export class StaticTextDisplay extends AbstractTextDisplay {
    private background: Phaser.Graphics;
    private spacebarAnimation: Phaser.Sprite;
    //https://phaser.io/examples/v2/text/display-text-word-by-word

    constructor(public state: EncounterState, public rectanglex: number, public  rectangley: number, public text: string, public textboxheight: number, public textboxwidth: number, private callback: any) {
        super(state.game, rectanglex, rectangley, text, StaticTextDisplay.getStyle());
        this.prefixTextWithHashTag();
        this.setText(this.getFirstTextChunk(this.text));
        this.setTextBounds(rectanglex, textboxheight, textboxwidth, textboxheight);

        this.addBackground(rectanglex, textboxheight, textboxwidth);
        //TODO: Spacebar is hidden if text is too long.
        this.addSpacebar();
    }

    private addBackground(rectanglex: number, textboxheight: number, textboxwidth: number) {
        this.background = this.state.game.add.graphics(0, 0);
        this.background.beginFill(0x008080, 1);
        this.background.drawRect(rectanglex, textboxheight, textboxwidth, textboxheight);
    }

    private addSpacebar() {
        this.spacebarAnimation = this.state.game.add.sprite(590, 550, "pressSpace", 0);
        this.spacebarAnimation.animations.add("blink");
        this.spacebarAnimation.animations.play("blink", 1, true);
    }

    getStyle(): Phaser.PhaserTextStyle {
        return StaticTextDisplay.getStyle();
    }

    static getStyle() {
        return {
            align: "left",
            font: 'bold 36pt Arial',
            fill: 'white',
            wordWrap: true,
            wordWrapWidth: 800,
            backgroundColor: "#008080",
            boundsAlignH: "left",
            boundsAlignV: "center"
        };
    }

    private prefixTextWithHashTag() {
        if (!this.text.startsWith("#")) {
            this.text = "#" + this.text;
        }
        return this.text;
    }

    public destroy() {
        this.background.destroy(true);
        this.spacebarAnimation.destroy(true);
        super.destroy();
    }

    public performCallback() {
        if (this.callback) {
            return this.callback();
        }
    }

    public hasCallback(): boolean {
        return this.callback;
    }
}
