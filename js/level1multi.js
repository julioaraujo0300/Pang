import { Player } from "./player.js";

export class Level1Multi extends Phaser.Scene{
    constructor(){
        super('Level1Multi');
    }

    init() {
        this.controls = this.input.keyboard.createCursorKeys();

    }

    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(2);

        this.player1 = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 6, false
            );
        
        this.player2 = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height,
            'player', 6, true
            );
            
        this.physics.add.existing(this.player1);
        this.player1.body.setCollideWorldBounds(true);
        
        this.physics.add.existing(this.player2);
        this.player2.body.setCollideWorldBounds(true);
    }

    update(time){
        this.player1.update(time);
        this.player2.update(time);
    }
}