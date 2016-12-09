var Classes;
(function (Classes) {
    var AbstractTextDisplay = PhaserExpansions.AbstractTextDisplay;
    class TextDisplay extends AbstractTextDisplay {
        constructor(state, x, y, text) {
            super(state.game, x, y, text, TextDisplay.getStyle());
            this.state = state;
            this.x = x;
            this.y = y;
            this.text = text;
            this.setText(this.getFirstTextChunk(text));
            this.setTextBounds(state.camera.x + 25, state.camera.y + (state.camera.height - 150), 800, 100);
        }
        getStyle() {
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
    Classes.TextDisplay = TextDisplay;
})(Classes || (Classes = {}));
//# sourceMappingURL=TextDisplay.js.map