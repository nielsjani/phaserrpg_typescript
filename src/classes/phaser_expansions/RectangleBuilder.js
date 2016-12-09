var Classes;
(function (Classes) {
    class RectangleBuilder {
        static rectangle() {
            return new RectangleBuilder();
        }
        build() {
            var bitmapRectangle = this.state.add.bitmapData(this.width, this.height);
            bitmapRectangle.ctx.beginPath();
            bitmapRectangle.ctx.rect(0, 0, this.width, this.height);
            bitmapRectangle.ctx.fillStyle = this.fillColor;
            bitmapRectangle.ctx.fill();
            return this.state.add.sprite(this.x, this.y, bitmapRectangle);
        }
        withX(value) {
            this.x = value;
            return this;
        }
        withY(value) {
            this.y = value;
            return this;
        }
        withState(value) {
            this.state = value;
            return this;
        }
        withWidth(value) {
            this.width = value;
            return this;
        }
        withHeight(value) {
            this.height = value;
            return this;
        }
        withFillColor(value) {
            this.fillColor = value;
            return this;
        }
    }
    Classes.RectangleBuilder = RectangleBuilder;
})(Classes || (Classes = {}));
//# sourceMappingURL=RectangleBuilder.js.map