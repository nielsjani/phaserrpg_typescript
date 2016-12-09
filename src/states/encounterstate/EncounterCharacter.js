var States;
(function (States) {
    var RectangleBuilder = Classes.RectangleBuilder;
    class EncounterCharacter {
        constructor(state, x, y, imageKey, imageHeight) {
            this.state = state;
            this.x = x;
            this.y = y;
            this.imageKey = imageKey;
            this.imageHeight = imageHeight;
            this.WHITE = '#FFFFFF';
            this.RED = "#C85054";
            this.GREEN = '#70f17b';
            this.currentRemainingHealthColor = this.GREEN;
            this.state.add.sprite(this.x, this.y, this.imageKey);
            this.createTotalHealthBar();
            this.createRemainingHealthBar(this.GREEN);
        }
        createRemainingHealthBar(color) {
            this.remainingHealthBar = RectangleBuilder.rectangle()
                .withState(this.state)
                .withFillColor(color)
                .withX(this.x)
                .withY(this.y + this.imageHeight + 5)
                .withWidth(180)
                .withHeight(15)
                .build();
        }
        createTotalHealthBar() {
            this.totalHealthBar = RectangleBuilder.rectangle()
                .withState(this.state)
                .withFillColor(this.WHITE)
                .withX(this.x)
                .withY(this.y + this.imageHeight + 5)
                .withWidth(180)
                .withHeight(15)
                .build();
        }
        decrementHealthBarUntil(percentage) {
            if (this.remainingHealthBarWidthTooBig(percentage)) {
                this.remainingHealthBar.width--;
                this.replaceByRedBarIfSizeLessThanOrEqualThanHalf();
            }
        }
        remainingHealthBarWidthTooBig(actualRemainingPercentage) {
            var totalHealthBarWidth = this.totalHealthBar.width;
            var remainingHealthBarWidth = this.remainingHealthBar.width;
            return remainingHealthBarWidth > (totalHealthBarWidth / 100) * actualRemainingPercentage;
        }
        replaceByRedBarIfSizeLessThanOrEqualThanHalf() {
            if (this.barWidthLessThanOrEqualThanHalf() && this.currentRemainingHealthColor === this.GREEN) {
                var newHealthBarWidth = this.remainingHealthBar.width;
                this.remainingHealthBar.destroy(true);
                this.createRemainingHealthBar(this.RED);
                this.remainingHealthBar.width = newHealthBarWidth;
                this.currentRemainingHealthColor = this.RED;
            }
        }
        barWidthLessThanOrEqualThanHalf() {
            return this.remainingHealthBar.width <= this.totalHealthBar.width / 2;
        }
    }
    States.EncounterCharacter = EncounterCharacter;
    class EncounterCharacterBuilder {
        static encounterCharacter() {
            return new EncounterCharacterBuilder();
        }
        build() {
            return new EncounterCharacter(this.state, this.x, this.y, this.imageKey, this.imageHeight);
        }
        withState(value) {
            this.state = value;
            return this;
        }
        withX(value) {
            this.x = value;
            return this;
        }
        withY(value) {
            this.y = value;
            return this;
        }
        withImageKey(value) {
            this.imageKey = value;
            return this;
        }
        withImageHeight(value) {
            this.imageHeight = value;
            return this;
        }
    }
    States.EncounterCharacterBuilder = EncounterCharacterBuilder;
})(States || (States = {}));
//# sourceMappingURL=EncounterCharacter.js.map