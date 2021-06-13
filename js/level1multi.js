import { Player } from "./player.js";
import { Harpoon } from './harpoon.js';
import { Ball } from './ball.js';
import { BlockHorizontal } from './blockhorizontal.js';

export class Level1Multi extends Phaser.Scene{
    constructor(){
        super('Level1Multi');
    }
    
    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        let style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"  };
        this.add.text(1800, 5, "Level1", style);
        this.life1 = this.add.image(10,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life2 = this.add.image(140,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life3 = this.add.image(270,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life4 = this.add.image(400,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life5 = this.add.image(530,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life6 = this.add.image(660,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.Yoffset = 720;
        this.ballsToWin = 5;
        this.canFire1 = true;
        this.canFire2 = true;
        this.ballArray = [];

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

        this.ballArray.push(this.ballFirst);
        this.player1.lives = 6;
            
        this.physics.add.existing(this.player1);
        this.player1.body.setCollideWorldBounds(true);
        this.physics.add.existing(this.player2);
        this.player2.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.harpoon1, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.physics.add.collider(this.harpoon1, this.ceiling, this.onCollisionCeiling, null, this);
        this.physics.add.collider(this.harpoon2, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.physics.add.collider(this.harpoon2, this.ceiling, this.onCollisionCeiling, null, this);
        this.physics.add.collider(this.player1, this.ballFirst, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.player2, this.ballFirst, this.onCollisionPlayer, null, this);
    }

    update(time){
        if(this.player1.firePressed && this.canFire1){
            this.canFire1 = false;
            this.fireHarpoon1();
        }
        if(this.player2.firePressed && this.canFire2){
            this.canFire2 = false;
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
                this.player1.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, true
                );
            this.ballArray.push(this.ballSecond1);
            this.ballArray.push(this.ballSecond2);
            this.physics.add.collider(this.harpoon1, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon1, this.ballSecond2, this.onCollisionBallSecond2, null, this);
            this.physics.add.collider(this.harpoon2, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon2, this.ballSecond2, this.onCollisionBallSecond2, null, this);
            this.physics.add.collider(this.player1, this.ballSecond1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player1, this.ballSecond2, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player2, this.ballSecond1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player2, this.ballSecond2, this.onCollisionPlayer, null, this);

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
                this.player1.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.ballArray.push(this.ballThird1);
            this.ballArray.push(this.ballThird2);
            this.physics.add.collider(this.harpoon1, this.ballThird1, this.onCollisionBallThird1, null, this);
            this.physics.add.collider(this.harpoon1, this.ballThird2, this.onCollisionBallThird2, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird1, this.onCollisionBallThird1, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird2, this.onCollisionBallThird2, null, this);
            this.physics.add.collider(this.player1, this.ballThird1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player1, this.ballThird2, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player2, this.ballThird1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player2, this.ballThird2, this.onCollisionPlayer, null, this);
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
                this.player1.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.ballArray.push(this.ballThird3);
            this.ballArray.push(this.ballThird4);
            this.physics.add.collider(this.harpoon1, this.ballThird3, this.onCollisionBallThird3, null, this);
            this.physics.add.collider(this.harpoon1, this.ballThird4, this.onCollisionBallThird4, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird3, this.onCollisionBallThird3, null, this);
            this.physics.add.collider(this.harpoon2, this.ballThird4, this.onCollisionBallThird4, null, this);
            this.physics.add.collider(this.player1, this.ballThird3, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player1, this.ballThird4, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player2, this.ballThird3, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player2, this.ballThird4, this.onCollisionPlayer, null, this);
        }
    }

    ThirdBallDestroyLogic(){
        if(this.ballsToWin <= 0){
            this.scene.start('Victory');
        }
    }

    ballReload(){
        for(let i = 0;i <= this.ballArray.length; i++){
            if(this.ballArray[i] != null){
                this.ballArray[i].destroy();
            }
        }
        this.ballFirst = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, false
            );
        this.physics.add.collider(this.player1, this.ballFirst, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.player2, this.ballFirst, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.harpoon1, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.physics.add.collider(this.harpoon2, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.ballsToWin = 5;
    }
    
    onCollisionBallFirst(){
        this.ResetHarpoon();
        this.ballFirst.destroyed = true;
        this.ballFirst.destroy();
        this.FirstBallDestroyLogic();
    }
    onCollisionBallSecond1(){
        this.ResetHarpoon();
        this.ballSecond1.destroyed = true;
        this.ballSecond1.destroy();
        this.SecondBallDestroyLogic();
    }
    onCollisionBallSecond2(){
        this.ResetHarpoon();
        this.ballSecond2.destroyed = true;
        this.ballSecond2.destroy();
        this.SecondBallDestroyLogic();
    }
    onCollisionBallThird1(){
        this.ResetHarpoon();
        this.ballThird1.destroyed = true;
        this.ballThird1.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird2(){
        this.ResetHarpoon();
        this.ballThird2.destroyed = true;
        this.ballThird2.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird3(){
        this.ResetHarpoon();
        this.ballThird3.destroyed = true;
        this.ballThird3.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird4(){
        this.ResetHarpoon();
        this.ballThird4.destroyed = true;
        this.ballThird4.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionCeiling(){
        this.ResetHarpoon();
    }
    onCollisionPlayer(){
        this.ResetHarpoon();
        this.player1.lives--;
        if(this.player1.lives < 6){
            this.life6.destroy();
        }
        if(this.player1.lives < 5){
            this.life5.destroy();
        }
        if(this.player1.lives < 4){
            this.life4.destroy();
        }
        if(this.player1.lives < 3){
            this.life3.destroy();
        }
        if(this.player1.lives < 2){
            this.life2.destroy();
        }
        if(this.player1.lives < 1){
            this.life1.destroy();
        }
        if(this.player1.lives <= 0){
            this.scene.start('Menu');
        }else{
            this.player1.x = this.game.config.width * 0.5;
            this.player2.x = this.game.config.width * 0.5;
            this.ballReload();
        }
    }

    ResetHarpoon(){
        this.harpoon1.setVelocityY(0);
        this.harpoon1.y = this.game.config.height + this.Yoffset;
        this.harpoon1.setImmovable(true);
        this.harpoon2.setVelocityY(0);
        this.harpoon2.y = this.game.config.height + this.Yoffset;
        this.harpoon2.setImmovable(true);
        this.canFire1 = true;
        this.canFire2 = true;
    }
}