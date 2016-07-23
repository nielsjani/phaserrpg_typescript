namespace Classes {
    export class Player extends Phaser.Sprite {

        idlePoses: any;
        lastDirection: any;

        constructor(public state: any,public x: any,public y: any,public imageRef: any) {
            super(state.game, x, y, imageRef);

            this.state = state;

            this.animations.add('left', [0, 1, 2], 10, true);
            this.animations.add('right', [3, 4, 5], 10, true);
            this.animations.add('down', [6, 7, 8], 10, true);
            this.animations.add('up', [9, 10, 11], 10, true);
            this.state.physics.arcade.enable(this);

            this.scale.setTo(3);

            this.createIdlePoses();
        }

        createIdlePoses() {
            this.idlePoses = new Map();
            this.idlePoses.set("left", 1);
            this.idlePoses.set("right", 4);
            this.idlePoses.set("down", 7);
            this.idlePoses.set("up", 10);
        }

        update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (!this.state.displayingText) {
                if (this.state.cursors.left.isDown) {
                    this.body.velocity.x -= 600;
                    this.animations.play("left");
                    this.lastDirection = "left";
                } else if (this.state.cursors.right.isDown) {
                    this.body.velocity.x += 600;
                    this.animations.play("right");
                    this.lastDirection = "right";
                } else if (this.state.cursors.up.isDown) {
                    this.body.velocity.y -= 600;
                    this.animations.play("up");
                    this.lastDirection = "up";
                } else if (this.state.cursors.down.isDown) {
                    this.body.velocity.y += 600;
                    this.animations.play("down");
                    this.lastDirection = "down";
                } else {
                    this.animations.stop();
                    this.frame = this.lastDirection ? this.idlePoses.get(this.lastDirection) : 7;
                }
            }
        }
    }
}