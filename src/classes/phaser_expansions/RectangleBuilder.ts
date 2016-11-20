///<reference path="../util/Constants.ts"/>

namespace Classes {
    import Constants  = Classes.Util.Constants;

    export class RectangleBuilder {
        private state: Phaser.State;
        private x: number;
        private y: number;
        private width: number;
        private height: number;
        private fillColor: string;


        public static rectangle() {
            return new RectangleBuilder();
        }

        public build() {
            var bitmapRectangle: Phaser.BitmapData = this.state.add.bitmapData(this.width, this.height);
            bitmapRectangle.ctx.beginPath();
            bitmapRectangle.ctx.rect(0, 0, this.width, this.height);
            bitmapRectangle.ctx.fillStyle = this.fillColor;
            bitmapRectangle.ctx.fill();
            return this.state.add.sprite(this.x, this.y, bitmapRectangle);
        }

        withX(value: number) {
            this.x = value;
            return this;
        }

        withY(value: number) {
            this.y = value;
            return this;
        }

        withState(value: Phaser.State) {
            this.state = value;
            return this;
        }


        withWidth(value: number) {
            this.width = value;
            return this;
        }

        withHeight(value: number) {
            this.height = value;
            return this;
        }

        withFillColor(value: string) {
            this.fillColor = value;
            return this;
        }
    }
}