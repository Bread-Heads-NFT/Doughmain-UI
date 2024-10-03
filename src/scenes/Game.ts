import { Dough } from '@/objects/dough';
import { Scene } from 'phaser';

export class Game extends Scene {
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    ground!: Phaser.GameObjects.Image;
    dough!: Dough;
    msg_text!: Phaser.GameObjects.Text;

    constructor() {
        super('Game');
    }

    preload() {
        this.scene.launch('Hud');
    }

    create() {
        this.camera = this.cameras.main;

        this.background = this.add.image(320, 240, 'background').setSize(640, 480);
        this.ground = this.physics.add.staticSprite(320, 480 - 32, 'ground').setSizeToFrame();
        this.dough = new Dough(this, 320, 100, 'bread');

        // The bread should collide with the ground.
        this.physics.add.collider(this.dough, this.ground);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update(time: number, delta: number) {
        this.dough.update(time, delta);
    }
}
