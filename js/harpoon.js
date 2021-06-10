export class Harpoon extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;

        // this.setCollideWorldBounds(true);
        this.setScale(0.8);

        this.velocity = -800;
    }
}