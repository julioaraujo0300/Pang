export class BlockHorizontal extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, flipped){
        super(scene, x, y, texture, flipped);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.image = texture;
        this.setImmovable(true);
    }
}