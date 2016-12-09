var Classes;
(function (Classes) {
    var Constants = Classes.Util.Constants;
    class ButtonBuilder {
        constructor() {
            this.text = "";
        }
        static statelessButton() {
            return new ButtonBuilder()
                .withHasStates(false);
        }
        static statefullButton() {
            return new ButtonBuilder()
                .withHasStates(true);
        }
        build() {
            let button = this.createButton();
            let text = this.state.game.add.text(0, 0, this.text, this.style ? this.style : this.defaultStyling());
            text.setTextBounds(0, 0, Constants.ENCOUNTER_MENU_BUTTON_WIDTH, Constants.ENCOUNTER_MENU_BUTTON_HEIGHT);
            button.addChild(text);
            return button;
        }
        defaultStyling() {
            return {
                font: 'bold 24pt Arial',
                wordWrap: true,
                wordWrapWidth: Constants.ENCOUNTER_MENU_BUTTON_WIDTH,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
        }
        createButton() {
            this.assureImageKeyNotUndefined();
            if (this.hasStates) {
                return this.state.game.add.button(this.x, this.y, this.imageKey, this.clickFunction, this.state, 0, 1, 2, 3);
            }
            else {
                return this.state.game.add.button(this.x, this.y, this.imageKey, this.clickFunction, this.state, 0);
            }
        }
        assureImageKeyNotUndefined() {
            if (!this.imageKey) {
                this.imageKey = "button";
            }
        }
        withX(value) {
            this.x = value;
            return this;
        }
        withY(value) {
            this.y = value;
            return this;
        }
        withStyle(value) {
            this.style = value;
            return this;
        }
        withText(value) {
            this.text = value;
            return this;
        }
        withClickFunction(value) {
            this.clickFunction = value;
            return this;
        }
        withImageKey(value) {
            this.imageKey = value;
            return this;
        }
        withState(value) {
            this.state = value;
            return this;
        }
        withHasStates(value) {
            this.hasStates = value;
            return this;
        }
    }
    Classes.ButtonBuilder = ButtonBuilder;
})(Classes || (Classes = {}));
//# sourceMappingURL=ButtonBuilder.js.map