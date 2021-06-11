import { Player } from "./player.js";
import { Harpoon } from './harpoon.js';
import { Ball } from './ball.js';
import { BlockHorizontal } from './blockhorizontal.js';

export class Level1Multi extends Phaser.Scene{
    constructor(){
        super('Level1Multi');
    }

    init() {
    }
    
    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        this.Yoffset = 720;
        this.ballsToWin = 4;
        this.canFire = true;

        this.player1 = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 0, false
            );
        this.player2 = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 0, true
            );
            
        this.harpoon1 = new Harpoon(
            this,
            this.game.config.width * 0.5,
            this.game.config.height + this.Yoffset,
            'harpoon'
            );
        this.harpoon2 = new Harpoon(
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
            
        this.physics.add.existing(this.player1);
        this.player1.body.setCollideWorldBounds(true);
        this.physics.add.existing(this.player2);
        this.player2.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.harpoon1, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.physics.add.collider(this.harpoon1, this.ceiling, this.onCollisionCeiling, null, this);
        this.physics.add.collider(this.harpoon2, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.physics.add.collider(this.harpoon2, this.ceiling, this.onCollisionCeiling, null, this);
        this.physics.add.collider(this.player1, this.ballFirst, this.onCollisionPlayer1, null, this);
        this.physics.add.collider(this.player2, this.ballFirst, this.onCollisionPlayer2, null, this);
    }

    update(time){
        if(this.player1.firePressed && this.canFire){
            this.canFire = false;
            this.fireHarpoon1();
        }
        if(this.player2.firePressed && this.canFire){
            this.canFire = false;
            this.fireHarpoon2();
        }
        this.player1.update(time);
        this.player2.update(time);
    }

    fireHarpoon1(){
        this.harpoon1.x = this.player1.x;
        this.harpoon1.setVelocityY(this.harpoon1.velocity);
    }
    fireHarpoon2(){
        this.harpoon2.x = this.player2.x;
        this.harpoon2.setVelocityY(this.harpoon2.velocity);
    }

    FirstBallDestroyLogic(){
        if(this.ballFirst.destroyed){
            this.ballSecond1 = new Ball(
                this,
                this.player1.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, false
                );
            this.ballSecond2 = new Ball(
                this,
                this.player2.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, true
                );
            this.physics.add.collider(this.harpoon1, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon1, this.ballSecond2, this.onCollisionBallSecond2, null, this);
            this.physics.add.collider(this.harpoon2, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon2, this.ballSecond2, this.onCollisionBallSecond2, null, this);
        }
    }

    SecondBallDestroyLogic(){
        if(this.ballSecond1.destroyed){
            this.ballThird1 = new Ball(
                this,
                this.player1.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, false
                );
            this.ballThird2 = new Ball(
                this,
                this.player2.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.physics.add.collider(this.harpoon1, this.ballThird1, this.onCollisionBallThird1, null, this);
            this.physics.add.collider(this.harpoon1, this.ballThird2, this.onCollisionBallThird2, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird1, this.onCollisionBallThird1, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird2, this.onCollisionBallThird2, null, this);
        }
        if(this.ballSecond2.destroyed){
            this.ballThird3 = new Ball(
                this,
                this.player1.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, false
                );
            this.ballThird4 = new Ball(
                this,
                this.player2.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.physics.add.collider(this.harpoon1, this.ballThird3, this.onCollisionBallThird3, null, this);
            this.physics.add.collider(this.harpoon1, this.ballThird4, this.onCollisionBallThird4, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird3, this.onCollisionBallThird3, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird4, this.onCollisionBallThird4, null, this);
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
        this.physics.add.collider(this.player1, this.ballFirst, this.onCollisionPlayer1, null, this);
        this.physics.add.collider(this.player2, this.ballFirst, this.onCollisionPlayer2, null, this);
    }

    onCollisionBallFirst(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballFirst.destroyed = true;
        this.ballFirst.destroy();
        this.FirstBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallSecond1(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballSecond1.destroyed = true;
        this.ballSecond1.destroy();
        this.SecondBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallSecond2(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballSecond2.destroyed = true;
        this.ballSecond2.destroy();
        this.SecondBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird1(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballThird1.destroyed = true;
        this.ballThird1.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird2(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballThird2.destroyed = true;
        this.ballThird2.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird3(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballThird3.destroyed = true;
        this.ballThird3.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionBallThird4(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.ballThird4.destroyed = true;
        this.ballThird4.destroy();
        this.ThirdBallDestroyLogic();
        this.canFire = true;
    }
    onCollisionCeiling(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.canFire = true;
    }
    onCollisionPlayer1(){
        this.player1.lives--;
        if(this.player1.lives <= 0){
            this.scene.start('Menu');
        }else{
            this.player1.x = this.game.config.width * 0.5;
            this.ballReload();
        }
    }
    onCollisionPlayer2(){
        this.player2.lives--;
        if(this.player2.lives <= 0){
            this.scene.start('Menu');
        }else{
            this.player2.x = this.game.config.width * 0.5;
            this.ballReload();
        }
    }
}