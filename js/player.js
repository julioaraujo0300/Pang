export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, isPlayer2){
        super(scene, x, y, texture, frame, isPlayer2);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(0.9);

        this.initialFrame = frame;

        this.secondPlayer = isPlayer2;

        this.horizontal_velocity = 200;

        this.controls = scene.input.keyboard.createCursorKeys();
        this.Akey = scene.input.keyboard.addKey('A');
        this.Dkey = scene.input.keyboard.addKey('D');
        this.FireKey = scene.input.keyboard.addKey('LeftShift');
    }

    update(time){
        if(this.secondPlayer){
            if(this.Akey.isDown) {
                this.setVelocityX(-this.horizontal_velocity);
                this.flipX = true;
                if(!this.anims.isPlaying){
                    this.anims.play('walking');
                }
            }else if(this.Dkey.isDown){
                this.setVelocityX(this.horizontal_velocity);
                this.flipX = false;
                if(!this.anims.isPlaying){
                    this.anims.play('walking');
                }
            }else{
                this.setVelocityX(0);
                if(this.anims.isPlaying){
                    this.anims.stop('walking');
                }
                this.setFrame(this.initialFrame);
            }
        }
        else{
            if(this.controls.left.isDown) {
                this.setVelocityX(-this.horizontal_velocity);
                this.flipX = true;
                if(!this.anims.isPlaying){
                    this.anims.play('walking');
                }
            }else if(this.controls.right.isDown){
                this.setVelocityX(this.horizontal_velocity);
                this.flipX = false;
                if(!this.anims.isPlaying){
                    this.anims.play('walking');
                }
            }else{
                this.setVelocityX(0);
                if(this.anims.isPlaying){
                    this.anims.stop('walking');
                }
                this.setFrame(this.initialFrame);
            }
        }
    }
}