export class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, scale, velocity) {
        super(scene, x, y, texture, scale, velocity);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1, 1);

        this.setScale(scale);
        this.setVelocity(velocity ,0);
    }
}