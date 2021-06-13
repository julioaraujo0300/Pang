export class Victory extends Phaser.Scene{
    constructor(){
        super('Victory');
    }

    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        let style = { font: "bold 90px Arial", fill: "#0000ff", boundsAlignH: "center", boundsAlignV: "middle"  };
        this.buttonOffset = 100;
        this.textOffsetX = 500;
        this.textOffsetY = 200;
        this.add.text(this.game.config.width * 0.5 - this.textOffsetX, this.game.config.height * 0.5 - this.textOffsetY, "Congratulations! You won", style);
        this.menuButton = this.add.image(this.game.config.width * 0.5, 
                                                this.game.config.height * 0.5 + this.buttonOffset,
                                                'menu').setScale(0.5);
        this.menuButton.setInteractive();
        this.menuButton.on('pointerdown', () => this.transitionToMenu());
    }

    transitionToMenu(){
        this.scene.start('Menu');
    }
}