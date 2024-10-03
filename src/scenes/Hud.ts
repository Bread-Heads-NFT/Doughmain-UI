import * as Phaser from 'phaser';

export class Hud extends Phaser.Scene {
    healthIcon: Phaser.GameObjects.Image[] = new Array(10);
    hungerIcon: Phaser.GameObjects.Image[] = new Array(10);
    health: number = 10;
    hunger: number = 10;
    happiness: number = 10;

    private X_OFFSET: number = 16;
    private HEALTH_Y_OFFSET: number = 10;
    private HUNGER_Y_OFFSET: number = 30;

    constructor() {
        super({ key: 'Hud' });
    }

    create() {
        for (let i = 0; i < this.health; i++) {
            this.healthIcon[i] = this.add.image((i + 0.5) * this.X_OFFSET, this.HEALTH_Y_OFFSET, 'health');
        }
        for (let i = 0; i < this.hunger; i++) {
            this.hungerIcon[i] = this.add.image((i + 0.5) * this.X_OFFSET, this.HUNGER_Y_OFFSET, 'hunger');
        }
    }
}