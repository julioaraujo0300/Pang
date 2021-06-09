import { Player } from "./player.js";

export class Level2 extends Phaser.Scene{
    constructor(){
        super('Level2');
    }

    init() {
        this.controls = this.input.keyboard.createCursorKeys();

    }

    create() {

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