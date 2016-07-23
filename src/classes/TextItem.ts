namespace Classes {
    import TextDisplay =Classes.TextDisplay;
    import GameState = States.GameState;

    export class TextItem {
        collides:boolean;

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
                collides: true,
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
}