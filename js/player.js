export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, isPlayer2){
        super(scene, x, y, texture, frame, isPlayer2);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(0.9);

        this.initialFrame = frame;

        this.secondPlayer = isPlayer2;
        this.firePressed = false;

        this.horizontal_velocity = 270;
        this.lives = 3;

        this.controls = scene.input.keyboard.createCursorKeys();
        this.Akey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.FireKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    update(time){
        this.Controls();
        this.FireHarpoon();
    }

    Controls(){
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
                this.setVelocityY(0);
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
    FireHarpoon(){
        if(this.secondPlayer){
            if(this.FireKey.isDown){
                this.firePressed = true;
                // this.harpoon = new Harpoon(
                //     this,
                //     this.x,
                //     this.game.config.height * 0.5,
                //     'harpoon'
                // );
            }else{}
        }
        else{
            if(this.controls.space.isDown){
                this.firePressed = true;
            }else{
                this.firePressed = false;
            }
        }
    }
}