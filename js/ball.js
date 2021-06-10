export class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, scale, velocity, reverseDirection) {
        super(scene, x, y, texture, scale, velocity, reverseDirection);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1, 1);

        this.destroyed = false;
        this.setScale(scale);
        if(reverseDirection){
            this.setVelocity(-velocity ,0);
        }else{
            this.setVelocity(velocity ,0);
        }
    }
}