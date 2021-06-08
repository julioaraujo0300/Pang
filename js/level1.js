import { Player } from "./player.js";

export class Level1 extends Phaser.Scene{
    constructor(){
        super('Level1');
    }

    init() {
        this.controls = this.input.keyboard.createCursorKeys();

    }

    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(2);

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player', 6
        )

        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

    }

    update(time){
        this.player.update(time);
    }
}