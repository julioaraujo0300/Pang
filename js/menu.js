export class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }

    init() {

    }

    create() {
        this.add.image(0,0,'background').setOrigin(0).setScale(2);
        this.offset = 100;
        this.singlePlayerButton = this.add.image(this.game.config.width * 0.5, 
                                                this.game.config.height * 0.5 - this.offset,
                                                '1playerbutton').setScale(0.5);
        this.multiPlayerButton = this.add.image(this.game.config.width * 0.5, 
                                                this.game.config.height * 0.5 + this.offset,
                                                '2playerbutton').setScale(0.5);
        this.singlePlayerButton.setInteractive();
        this.multiPlayerButton.setInteractive();
        this.singlePlayerButton.on('pointerdown', () => this.transitionToLevel(true));
        this.multiPlayerButton.on('pointerdown', () => this.transitionToLevel(false));
    }

    update(time){
        
    }

    transitionToLevel(singlePlayer){
        if(singlePlayer){
            this.scene.start('Level1');
        }else{
            this.scene.start('Level2');
        }
    }
}