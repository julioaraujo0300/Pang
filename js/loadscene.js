export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('background', './images/background.png');
        this.load.image('1playerbutton', './images/1PlayerButton.png');
        this.load.image('2playerbutton', './images/2PlayerButton.png');
        this.load.image('harpoon','./images/Harpoon.png');
        this.load.image('pizza1', './images/pizza1.png');
        this.load.image('pizza2', './images/pizza2.png');
        this.load.image('pizza3', './images/pizza3.png');
        this.load.image('pizza4', './images/pizza4.png');
        this.load.image('ceiling', './images/ceiling.png');
        this.load.image('menu', './images/MenuButton.png');
        this.load.spritesheet('player', './images/player.png', {
            frameWidth: 114,
            frameHeight: 223
        })
    }

    create() {
        this.createAnimations();
        this.scene.start('Menu');
    }

    createAnimations(){
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNames('player', {
                frames: [1, 2]
            }),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
    }
}