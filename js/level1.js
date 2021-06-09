import { Player } from "./player.js";

export class Level1 extends Phaser.Scene{
    constructor(){
        super('Level1');
    }

    init() {
        this.offsetY = 0;
    }

    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(2);

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 6, false
            );
            
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

    }

    update(time){
        this.player.update(time);
    }
}