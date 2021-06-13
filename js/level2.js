import { Player } from "./player.js";
import { Harpoon } from './harpoon.js';
import { Ball } from './ball.js';
import { BlockHorizontal } from './blockhorizontal.js';

export class Level2 extends Phaser.Scene{
    constructor(){
        super('Level2');
    }

    init() {
    }
    
    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        let style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"  };
        this.add.text(1800, 5, "Level2", style);
        this.life1 = this.add.image(10,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life2 = this.add.image(140,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life3 = this.add.image(280,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.Yoffset = 720;
        this.ballsToWin = 5;
        this.canFire = true;
        this.ballArray = [];

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
        this.ballFirst1 = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, false
            );
        this.ballFirst2 = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, true
            );
        this.ceiling = new BlockHorizontal(
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 1080,
            'ceiling', true
        )

        this.ballArray.push(this.ballFirst1);
        this.ballArray.push(this.ballFirst2);
            
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.harpoon, this.ballFirst1, this.onCollisionBallFirst1, null, this);
        this.physics.add.collider(this.harpoon, this.ballFirst2, this.onCollisionBallFirst2, null, this);
        this.physics.add.collider(this.player, this.ballFirst1, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.player, this.ballFirst2, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.harpoon, this.ceiling, this.onCollisionCeiling, null, this);
    }

    update(time){
        if(this.player.firePressed && this.canFire){
            this.canFire = false;
            this.fireHarpoon();
        }
        console.log(this.ballsToWin);
        this.player.update(time);
    }

    fireHarpoon(){
        this.harpoon.x = this.player.x;
        this.harpoon.setVelocityY(this.harpoon.velocity);
    }

    FirstBallDestroyLogic(){
        if(this.ballFirst1.destroyed){
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
            this.ballArray.push(this.ballSecond1);
            this.ballArray.push(this.ballSecond2);
            this.physics.add.collider(this.harpoon, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon, this.ballSecond2, this.onCollisionBallSecond2, null, this);
            this.physics.add.collider(this.player, this.ballSecond1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballSecond2, this.onCollisionPlayer, null, this);
        }
        if(this.ballFirst2.destroyed){
            this.ballSecond3 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, false
                );
            this.ballSecond4 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.4,
                'pizza2', 0.3, 300, true
                );
            this.ballArray.push(this.ballSecond3);
            this.ballArray.push(this.ballSecond4);
            this.physics.add.collider(this.harpoon, this.ballSecond3, this.onCollisionBallSecond3, null, this);
            this.physics.add.collider(this.harpoon, this.ballSecond4, this.onCollisionBallSecond4, null, this);
            this.physics.add.collider(this.player, this.ballSecond3, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballSecond4, this.onCollisionPlayer, null, this);
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
            this.ballArray.push(this.ballThird1);
            this.ballArray.push(this.ballThird2);
            this.physics.add.collider(this.harpoon, this.ballThird1, this.onCollisionBallThird1, null, this);
            this.physics.add.collider(this.harpoon, this.ballThird2, this.onCollisionBallThird2, null, this);
            this.physics.add.collider(this.player, this.ballThird1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballThird2, this.onCollisionPlayer, null, this);
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
            this.ballArray.push(this.ballThird3);
            this.ballArray.push(this.ballThird4);
            this.physics.add.collider(this.harpoon, this.ballThird3, this.onCollisionBallThird3, null, this);
            this.physics.add.collider(this.harpoon, this.ballThird4, this.onCollisionBallThird4, null, this);
            this.physics.add.collider(this.player, this.ballThird3, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballThird4, this.onCollisionPlayer, null, this);
        }
        if(this.ballSecond3.destroyed){
            this.ballThird5 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, false
                );
            this.ballThird6 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.ballArray.push(this.ballThird3);
            this.ballArray.push(this.ballThird4);
            this.physics.add.collider(this.harpoon, this.ballThird5, this.onCollisionBallThird5, null, this);
            this.physics.add.collider(this.harpoon, this.ballThird6, this.onCollisionBallThird6, null, this);
            this.physics.add.collider(this.player, this.ballThird5, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballThird6, this.onCollisionPlayer, null, this);
        }
        if(this.ballSecond4.destroyed){
            this.ballThird7 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, false
                );
            this.ballThird8 = new Ball(
                this,
                this.player.x,
                this.game.config.height * 0.6,
                'pizza3', 0.2, 300, true
                );
            this.ballArray.push(this.ballThird3);
            this.ballArray.push(this.ballThird4);
            this.physics.add.collider(this.harpoon, this.ballThird7, this.onCollisionBallThird7, null, this);
            this.physics.add.collider(this.harpoon, this.ballThird8, this.onCollisionBallThird8, null, this);
            this.physics.add.collider(this.player, this.ballThird7, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballThird8z, this.onCollisionPlayer, null, this);
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
        this.ballFirst1 = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, false
            );
        this.ballFirst2 = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'pizza1', 0.5, 300, true
            );
        this.physics.add.collider(this.harpoon, this.ballFirst1, this.onCollisionBallFirst1, null, this);
        this.physics.add.collider(this.harpoon, this.ballFirst2, this.onCollisionBallFirst2, null, this);
        this.physics.add.collider(this.player, this.ballFirst1, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.player, this.ballFirst2, this.onCollisionPlayer, null, this);
    }
    //collision checks ball1
    onCollisionBallFirst1(){
        this.ResetHarpoon();
        this.ballFirst1.destroyed = true;
        this.ballFirst1.destroy();
        this.Destroyer();
        this.FirstBallDestroyLogic();
    }
    onCollisionBallFirst2(){
        this.ResetHarpoon();
        this.ballFirst2.destroyed = true;
        this.ballFirst2.destroy();
        this.Destroyer();
        this.FirstBallDestroyLogic();
    }
        //collision checks ball2
    onCollisionBallSecond1(){
        this.ResetHarpoon();
        this.ballSecond1.destroyed = true;
        this.SecondBallDestroyLogic();
        this.ballSecond1.destroy();
        this.Destroyer();
    }
    onCollisionBallSecond2(){
        this.ResetHarpoon();
        this.ballSecond2.destroyed = true;
        this.SecondBallDestroyLogic();
        this.ballSecond2.destroy();
        this.Destroyer();
    }
    onCollisionBallSecond3(){
        this.ResetHarpoon();
        this.ballSecond3.destroyed = true;
        this.SecondBallDestroyLogic();
        this.ballSecond3.destroy();
        this.Destroyer();
    }
    onCollisionBallSecond4(){
        this.ResetHarpoon();
        this.ballSecond4.destroyed = true;
        this.SecondBallDestroyLogic();
        this.ballSecond4.destroy();
        this.Destroyer();
    }
        //collision checks ball3
    onCollisionBallThird1(){
        this.ResetHarpoon();
        this.ballThird1.destroyed = true;
        this.ballThird1.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird2(){
        this.ResetHarpoon();
        this.ballThird2.destroyed = true;
        this.ballThird2.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird3(){
        this.ResetHarpoon();
        this.ballThird3.destroyed = true;
        this.ballThird3.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird4(){
        this.ResetHarpoon();
        this.ballThird4.destroyed = true;
        this.ballThird4.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird5(){
        this.ResetHarpoon();
        this.ballThird5.destroyed = true;
        this.ballThird5.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird6(){
        this.ResetHarpoon();
        this.ballThird6.destroyed = true;
        this.ballThird6.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird7(){
        this.ResetHarpoon();
        this.ballThird7.destroyed = true;
        this.ballThird7.destroy();
        this.ballsToWin--;
        this.Destroyer();
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird8(){
        this.ResetHarpoon();
        this.ballThird8.destroyed = true;
        this.ballThird8.destroy();
        this.Destroyer();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionCeiling(){
        this.ResetHarpoon();;
    }
    onCollisionPlayer(){
        // console.log(this.player.lives);
        // this.player.lives--;
        // if(this.player.lives < 3){
        //     this.life3.destroy();
        // }
        // if(this.player.lives < 2){
        //     this.life2.destroy();
        // }
        // if(this.player.lives < 1){
        //     this.life1.destroy();
        // }
        // if(this.player.lives <= 0){
        //     this.scene.start('Menu');
        // }else{
        //     this.player.x = this.game.config.width * 0.5;
        //     this.ballReload();
        // }
    }
    ResetHarpoon(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.canFire = true;
    }

    Destroyer(){
        for(let i = 0;i <= this.ballArray.length; i++){
            if(this.ballArray[i] != null && this.ballArray[i].destroyed){
                this.ballArray[i].destroy();
            }
        }
    }
}