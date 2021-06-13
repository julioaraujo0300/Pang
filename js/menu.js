export class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
        this.singlePlayer = false;
    }
    
    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(1);
        this.offset = 100;
        this.singlePlayerButton = this.add.image(this.game.config.width * 0.5, 
                                                this.game.config.height * 0.5 - this.offset,
                                                '1playerbutton').setScale(0.5);
        this.multiPlayerButton = this.add.image(this.game.config.width * 0.5, 
                                                this.game.config.height * 0.5 + this.offset,
                                                '2playerbutton').setScale(0.5);
        this.singlePlayerButton.setInteractive();
        this.multiPlayerButton.setInteractive();
        this.singlePlayerButton.on('pointerdown', () => this.transitionToLevel(1));
        this.multiPlayerButton.on('pointerdown', () => this.transitionToLevel(2));
    }

    transitionToLevel(numberPlayers){
        if(numberPlayers == 1){
            this.scene.start('Level1');
        }else{
            this.scene.start('Level1Multi');
        }
    }
}