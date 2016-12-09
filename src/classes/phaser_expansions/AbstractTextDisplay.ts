import PhaserTextStyle = Phaser.PhaserTextStyle;
export abstract class AbstractTextDisplay extends Phaser.Text {
    textToDisplay: any[];
    textDisplayingPart: number;

    constructor(public game: Phaser.Game, public x: number, public  y: number, public text: string, phaserTextStyle: PhaserTextStyle) {
        super(game, x, y, text, phaserTextStyle);
    }

    updateTextbox() {
        this.setText(this.textToDisplay[this.textDisplayingPart + 1]);
        this.setStyle(this.getStyle());
        this.textDisplayingPart += 1;
    }

    hasMore() {
        return this.textDisplayingPart + 1 < this.textToDisplay.length;
    }

    public abstract getStyle(): PhaserTextStyle;

    getFirstTextChunk(text: string) {
        this.textToDisplay = text.split("#");
        this.textDisplayingPart = 1;
        return this.textToDisplay[this.textDisplayingPart];
    }
}
