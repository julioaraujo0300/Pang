import { Player } from "./player.js";
import { Harpoon } from './harpoon.js';
import { Ball } from './ball.js';
import { BlockHorizontal } from './blockhorizontal.js';

export class Level1 extends Phaser.Scene{
    constructor(){
        super('Level1');
    }

    init() {
    }
    
    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        this.life1 = this.add.image(10,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life2 = this.add.image(140,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life3 = this.add.image(280,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.Yoffset = 720;
        this.ballsToWin = 4;
        this.canFire = true;

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 0, false
            );
        this.harpoon = new Harpoon(
            this,
            this.game.config.width * 0.5,
            this.game.config.height + this.Yoffset,
            'harpoon'
            );
        this.ballFirst = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, false
            );
        this.ceiling = new BlockHorizontal(
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 1080,
            'ceiling', true
        )
            
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.harpoon, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.physics.add.collider(this.harpoon, this.ceiling, this.onCollisionCeiling, null, this);
        this.physics.add.collider(this.player, this.ballFirst, this.onCollisionPlayer, null, this);
    }

    update(time){
        if(this.player.firePressed && this.canFire){
            this.canFire = false;
            this.fireHarpoon();
        }
        this.player.update(time);
    }

    fireHarpoon(){
        this.harpoon.x = this.player.x;
        this.harpoon.setVelocityY(this.harpoon.velocity);
    }

    FirstBallDestroyLogic(){
        if(this.ballFirst.destroyed){
            this.ballSecond1 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, false
                );
            this.ballSecond2 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, true
                );
            this.physics.add.collider(this.harpoon, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon, this.ballSecond2, this.onCollisionBallSecond2, null, this);
        }
    }

    SecondBallDestroyLogic(){
        if(this.ballSecond1.destroyed){
            this.ballThird1 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, false
                );
            this.ballThird2 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.physics.add.collider(this.harpoon, this.ballThird1, this.onCollisionBallThird1, null, this);
            this.physics.add.collider(this.harpoon, this.ballThird2, this.onCollisionBallThird2, null, this);
        }
        if(this.ballSecond2.destroyed){
            this.ballThird3 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, false
                );
            this.ballThird4 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.physics.add.collider(this.harpoon, this.ballThird3, this.onCollisionBallThird3, null, this);
            this.physics.add.collider(this.harpoon, this.ballThird4, this.onCollisionBallThird4, null, this);
        }
    }

    ThirdBallDestroyLogic(){
        if(this.ballThird1.destroyed){
            this.ballsToWin--;
        }
        if(this.ballThird2.destroyed){
            this.ballsToWin--;
        }
        if(this.ballThird3.destroyed){
            this.ballsToWin--;
        }
        if(this.ballThird4.destroyed){
            this.ballsToWin--;
        }
        if(this.ballsToWin <= 0){
            this.scene.start('Level2');
        }
    }

    ballReload(){
        this.ballFirst.destroy();
        this.ballFirst = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, false
            );
        this.physics.add.collider(this.player, this.ballFirst, this.onCollisionPlayer, null, this);
    }

    onCollisionBallFirst(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballFirst.destroyed = true;
        this.ballFirst.destroy();
        this.FirstBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallSecond1(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballSecond1.destroyed = true;
        this.ballSecond1.destroy();
        this.SecondBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallSecond2(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballSecond2.destroyed = true;
        this.ballSecond2.destroy();
        this.SecondBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird1(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballThird1.destroyed = true;
        this.ballThird1.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird2(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballThird2.destroyed = true;
        this.ballThird2.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird3(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballThird3.destroyed = true;
        this.ballThird3.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird4(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.ballThird4.destroyed = true;
        this.ballThird4.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionCeiling(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.canFire = true;
    }
    onCollisionPlayer(){
        console.log(this.player.lives);
        this.player.lives--;
        if(this.player.lives < 3){
            this.life3.destroy();
        }
        if(this.player.lives < 2){
            this.life2.destroy();
        }
        if(this.player.lives < 1){
            this.life1.destroy();
        }
        if(this.player.lives <= 0){
            this.scene.start('Menu');
        }else{
            this.player.x = this.game.config.width * 0.5;
            this.ballReload();
        }
    }
}