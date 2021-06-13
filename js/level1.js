import { Player } from "./player.js";
import { Harpoon } from './harpoon.js';
import { Ball } from './ball.js';
import { BlockHorizontal } from './blockhorizontal.js';

export class Level1 extends Phaser.Scene{
    constructor(){
        super('Level1');
    }
    
    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        let style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"  };
        this.add.text(1800, 5, "Level1", style);
        this.life1 = this.add.image(10,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life2 = this.add.image(140,5, 'pizza4').setOrigin(0).setScale(0.2);
        this.life3 = this.add.image(270,5, 'pizza4').setOrigin(0).setScale(0.2);
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
            this.ballArray.push(this.ballSecond1);
            this.ballArray.push(this.ballSecond2);
            this.physics.add.collider(this.harpoon, this.ballSecond1, this.onCollisionBallSecond1, null, this);
            this.physics.add.collider(this.harpoon, this.ballSecond2, this.onCollisionBallSecond2, null, this);
            this.physics.add.collider(this.player, this.ballSecond1, this.onCollisionPlayer, null, this);
            this.physics.add.collider(this.player, this.ballSecond2, this.onCollisionPlayer, null, this);

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
    }

    ThirdBallDestroyLogic(){
        if(this.ballsToWin <= 0){
            this.scene.start('Level2');
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
        this.physics.add.collider(this.player, this.ballFirst, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this.harpoon, this.ballFirst, this.onCollisionBallFirst, null, this);
        this.ballsToWin = 5;
    }
    
    onCollisionBallFirst(){
        this.ResetHarpoon();;
        this.ballFirst.destroyed = true;
        this.ballFirst.destroy();
        this.FirstBallDestroyLogic();
    }
    onCollisionBallSecond1(){
        this.ResetHarpoon();;
        this.ballSecond1.destroyed = true;
        this.ballSecond1.destroy();
        this.SecondBallDestroyLogic();
    }
    onCollisionBallSecond2(){
        this.ResetHarpoon();;
        this.ballSecond2.destroyed = true;
        this.ballSecond2.destroy();
        this.SecondBallDestroyLogic();
    }
    onCollisionBallThird1(){
        this.ResetHarpoon();;
        this.ballThird1.destroyed = true;
        this.ballThird1.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird2(){
        this.ResetHarpoon();;
        this.ballThird2.destroyed = true;
        this.ballThird2.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird3(){
        this.ResetHarpoon();;
        this.ballThird3.destroyed = true;
        this.ballThird3.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionBallThird4(){
        this.ResetHarpoon();;
        this.ballThird4.destroyed = true;
        this.ballThird4.destroy();
        this.ballsToWin--;
        this.ThirdBallDestroyLogic();
    }
    onCollisionCeiling(){
        this.ResetHarpoon();;
    }
    onCollisionPlayer(){
        this.ResetHarpoon();;
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

    ResetHarpoon(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.canFire = true;
    }
}