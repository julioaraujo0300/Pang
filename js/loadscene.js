export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('background', './images/blue_land.png');
        this.load.image('1playerbutton', './images/1PlayerButton.png');
        this.load.image('2playerbutton', './images/2PlayerButton.png');
        this.load.image('harpoon','./images/Harpoon.png');
        this.load.image('ball', './images/ballBlue.png');
        this.load.image('ceiling', './images/ceiling.png');
        this.load.spritesheet('player', './images/player.png', {
            frameWidth: 128,
            frameHeight: 144
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
                frames: [9, 10]
            }),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
    }
}