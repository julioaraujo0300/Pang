import { LoadScene } from './loadscene.js';
import { Menu } from './menu.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';

const config = {
    width: 2048,
    height: 2048,
    type: Phaser.AUTO,
    parent: 'game-canvas',
    backgroundColor: '#000',
    scene: [LoadScene, Level1, Level2, Menu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
        },
        debug:true
    },
    pixelArt: true
}

new Phaser.Game(config);