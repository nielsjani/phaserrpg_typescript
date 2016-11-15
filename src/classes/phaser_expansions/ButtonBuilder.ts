///<reference path="../util/Constants.ts"/>

namespace Classes {
    import Constants  = Classes.Util.Constants;

    export class ButtonBuilder {
        private x: number;
        private y: number;
        private style: any;
        private text: string = "";
        private clickFunction: any;
        private hasStates: boolean;
        private imageKey: string;
        private state: Phaser.State;

        public static statelessButton() {
            return new ButtonBuilder()
                .withHasStates(false);
        }

        public static statefullButton() {
            return new ButtonBuilder()
                .withHasStates(true);
        }

        public build() {
            let button: Phaser.Button = this.createButton();
            let text: Phaser.Text = this.state.game.add.text(0, 0, this.text, this.style ? this.style : this.defaultStyling());
            text.setTextBounds(0, 0, Constants.ENCOUNTER_MENU_BUTTON_WIDTH, Constants.ENCOUNTER_MENU_BUTTON_HEIGHT);
            button.addChild(text);
            return button;
        }

        private defaultStyling() {
            return {
                font: 'bold 24pt Arial',
                wordWrap: true,
                wordWrapWidth: Constants.ENCOUNTER_MENU_BUTTON_WIDTH,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
        }

        private createButton(): Phaser.Button {
            this.assureImageKeyNotUndefined();
            if (this.hasStates) {
                return this.state.game.add.button(this.x, this.y, this.imageKey, this.clickFunction, this.state, 0, 1, 2, 3);
            } else {
                return this.state.game.add.button(this.x, this.y, this.imageKey, this.clickFunction, this.state, 0);
            }
        }

        private assureImageKeyNotUndefined() {
            if (!this.imageKey) {
                this.imageKey = "button";
            }
        }


        withX(value: number) {
            this.x = value;
            return this;
        }

        withY(value: number) {
            this.y = value;
            return this;
        }

        withStyle(value: any) {
            this.style = value;
            return this;
        }

        withText(value: string) {
            this.text = value;
            return this;
        }

        withClickFunction(value: any) {
            this.clickFunction = value;
            return this;
        }

        withImageKey(value: string) {
            this.imageKey = value;
            return this;
        }

        withState(value: Phaser.State) {
            this.state = value;
            return this;
        }

        withHasStates(value: boolean) {
            this.hasStates = value;
            return this;
        }
    }
}