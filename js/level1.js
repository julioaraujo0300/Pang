import { Player } from "./player.js";
import { Harpoon } from './harpoon.js';
import { Ball } from './ball.js';
import { BlockHorizontal } from './blockhorizontal.js';

export class Level1 extends Phaser.Scene{
    constructor(){
        super('Level1');
    }

    init() {
        this.Yoffset = 375;
    }

    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(2);
        this.canFire = true;

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 6, false
            );
        this.harpoon = new Harpoon(
            this,
            this.game.config.width * 0.5,
            this.game.config.height + this.Yoffset,
            'harpoon'
            );
        this.ball = new Ball(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.3,
            'ball', 2, 300
            );
        this.ceiling = new BlockHorizontal(
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 1070,
            'ceiling', true
        )
            
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.harpoon, this.ball, this.onCollision, null, this);
        this.physics.add.collider(this.harpoon, this.ceiling, this.onCollision, null, this);

    }

    update(time){
        if(this.player.firePressed && this.canFire){
            this.canFire = false;
            this.fireHarpoon();
        }
        this.player.update(time);
        console.log(this.canFire);
    }

    fireHarpoon(){
        console.log("im running");
        this.harpoon.x = this.player.x;
        this.harpoon.setVelocityY(this.harpoon.velocity);
    }

    onCollision(){
        this.harpoon.setVelocityY(0);
        this.harpoon.y = this.game.config.height + this.Yoffset;
        this.harpoon.setImmovable(true);
        this.canFire = true;
    }
}