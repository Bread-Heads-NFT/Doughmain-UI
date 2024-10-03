import * as Phaser from 'phaser';

export class Dough extends Phaser.Physics.Arcade.Sprite {
    SPEED = 100;
    JUMP_SPEED = 600;
    BOUNCE_SPEED = 200;
    SCALE = 2;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        }

        this.setSize(14, 32);
        this.setScale(this.SCALE);
        this.createAnimations(scene, texture);
    }

    update(time: number, delta: number) {
        // Return early if we're not on the ground.
        if (!this.body?.blocked.down) {
            return;
        }

        // If we've hit the edge of the screen, stop moving.
        if (this.body.blocked.left || this.body.blocked.right) {
            this.stand();
        }

        // Only update once per second.
        if (time % 1000 < delta) {
            // Choose a random direction to move in.
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    if (this.body.velocity.x > 0) {
                        this.stand()
                    } else {
                        this.moveLeft();
                    }
                    break;
                case 1:
                    if (this.body.velocity.x < 0) {
                        this.stand()
                    } else {
                        this.moveRight();
                    }
                    break;
                case 2:
                    this.stand();
                    break;
            }
        }
    }

    moveLeft(): void {
        if (this.body && !this.body.blocked.left) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.SPEED); // move left
            this.anims.play("run", true);
            this.flipX = true; // flip the sprite to the left
        }
    }

    moveRight(): void {
        if (this.body && !this.body.blocked.right) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(this.SPEED); // move right
            this.anims.play("run", true);
            this.flipX = false; // use the original sprite looking to the right
        }
    }

    stand(): void {
        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
            this.anims.play("stop", true);
        }
    }

    jump(): void {
        if (this.body) {
            const canJump = this.body?.blocked.down;

            if (canJump) {
                (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-this.JUMP_SPEED);
                this.anims.play("jump", true);
            }
        }
    }

    private createAnimations(scene: Phaser.Scene, texture: string) {
        scene.anims.create({
            key: "stop",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [0]
            })
        });
        scene.anims.create({
            key: "run",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [3, 4, 5]
            }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: "jump",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [1]
            })
        });

        scene.anims.create({
            key: "fall",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [2]
            })
        });
    }
}