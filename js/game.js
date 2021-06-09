import { LoadScene } from './loadscene.js';
import { Menu } from './menu.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';
import { Level1Multi } from './level1multi.js';

const config = {
    width: 1080,
    height: 720,
    type: Phaser.AUTO,
    parent: 'game-canvas',
    backgroundColor: '#000',
    scene: [LoadScene, Level1, Level2, Level1Multi, Menu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            },
        },
        debug:true
    },
    pixelArt: true
}

new Phaser.Game(config);