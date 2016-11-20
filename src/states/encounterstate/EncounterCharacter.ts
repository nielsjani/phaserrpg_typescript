///<reference path="../../classes/phaser_expansions/RectangleBuilder.ts"/>

namespace States {
    import Constants  = Classes.Util.Constants;
    import RectangleBuilder = Classes.RectangleBuilder;

    export class EncounterCharacter {
        private totalHealthBar: Phaser.Sprite;
        private remainingHealthBar: Phaser.Sprite;

        private WHITE = '#FFFFFF';
        private RED = "#C85054";
        private GREEN = '#70f17b';
        private currentRemainingHealthColor = this.GREEN;

        constructor(private state: Phaser.State, private x: number, private y: number, private imageKey: string, private imageHeight: number) {
            this.state.add.sprite(this.x, this.y, this.imageKey);
            this.createTotalHealthBar();
            this.createRemainingHealthBar(this.GREEN);
        }

        private createRemainingHealthBar(color: string) {
            this.remainingHealthBar = RectangleBuilder.rectangle()
                .withState(this.state)
                .withFillColor(color)
                .withX(this.x)
                .withY(this.y + this.imageHeight +5 )
                .withWidth(180)
                .withHeight(15)
                .build();
        }

        private createTotalHealthBar() {
            this.totalHealthBar = RectangleBuilder.rectangle()
                .withState(this.state)
                .withFillColor(this.WHITE)
                .withX(this.x)
                .withY(this.y +this.imageHeight +5)
                .withWidth(180)
                .withHeight(15)
                .build();
        }

        decrementHealthBarUntil(percentage: number) {
            if (this.remainingHealthBarWidthTooBig(percentage)) {
                this.remainingHealthBar.width--;
                this.replaceByRedBarIfSizeLessThanOrEqualThanHalf();
            }
        }

        private remainingHealthBarWidthTooBig(actualRemainingPercentage: number) {
            var totalHealthBarWidth: number = this.totalHealthBar.width;
            var remainingHealthBarWidth = this.remainingHealthBar.width;
            return remainingHealthBarWidth > (totalHealthBarWidth / 100) * actualRemainingPercentage;
        }

        private replaceByRedBarIfSizeLessThanOrEqualThanHalf() {
            if (this.barWidthLessThanOrEqualThanHalf() && this.currentRemainingHealthColor === this.GREEN) {
                var newHealthBarWidth = this.remainingHealthBar.width;
                this.remainingHealthBar.destroy(true);
                this.createRemainingHealthBar(this.RED);
                this.remainingHealthBar.width = newHealthBarWidth;
                this.currentRemainingHealthColor = this.RED
            }
        }

        private barWidthLessThanOrEqualThanHalf() {
            return this.remainingHealthBar.width <= this.totalHealthBar.width / 2;
        }
    }

    export class EncounterCharacterBuilder {
        private state: Phaser.State;
        private x: number;
        private y: number;
        private imageKey: string;
        private imageHeight: number;


        public static encounterCharacter() {
            return new EncounterCharacterBuilder();
        }

        public build() {
            return new EncounterCharacter(this.state, this.x, this.y, this.imageKey, this.imageHeight);
        }


        withState(value: Phaser.State) {
            this.state = value;
            return this;
        }

        withX(value: number) {
            this.x = value;
            return this;
        }

        withY(value: number) {
            this.y = value;
            return this;
        }

        withImageKey(value: string) {
            this.imageKey = value;
            return this;
        }

        withImageHeight(value: number) {
            this.imageHeight = value;
            return this;
        }
    }
}