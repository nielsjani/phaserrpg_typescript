var PhaserExpansions;
(function (PhaserExpansions) {
    class AbstractTextDisplay extends Phaser.Text {
        constructor(game, x, y, text, phaserTextStyle) {
            super(game, x, y, text, phaserTextStyle);
            this.game = game;
            this.x = x;
            this.y = y;
            this.text = text;
        }
        updateTextbox() {
            this.setText(this.textToDisplay[this.textDisplayingPart + 1]);
            this.setStyle(this.getStyle());
            this.textDisplayingPart += 1;
        }
        hasMore() {
            return this.textDisplayingPart + 1 < this.textToDisplay.length;
        }
        getFirstTextChunk(text) {
            this.textToDisplay = text.split("#");
            this.textDisplayingPart = 1;
            return this.textToDisplay[this.textDisplayingPart];
        }
    }
    PhaserExpansions.AbstractTextDisplay = AbstractTextDisplay;
})(PhaserExpansions || (PhaserExpansions = {}));
//# sourceMappingURL=AbstractTextDisplay.js.map