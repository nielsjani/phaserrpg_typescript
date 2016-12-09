var Classes;
(function (Classes) {
    var TextDisplay = Classes.TextDisplay;
    class TextItem {
        constructor(x, y, sprite, text) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.text = text;
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
            };
        }
        handleOverlap(state) {
            if (state.spacebar.justDown) {
                if (!state.displayingText) {
                    state.currentlyDisplayedText = new TextDisplay(state, 0, 0, this.text);
                    state.add.existing(state.currentlyDisplayedText);
                    state.displayingText = true;
                }
                else if (state.currentlyDisplayedText.hasMore()) {
                    state.currentlyDisplayedText.updateTextbox();
                }
                else {
                    state.currentlyDisplayedText.destroy();
                    state.displayingText = false;
                }
            }
        }
    }
    Classes.TextItem = TextItem;
})(Classes || (Classes = {}));
//# sourceMappingURL=TextItem.js.map