import { LoadScene } from './loadscene.js';
import { Menu } from './menu.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';
import { Level1Multi } from './level1multi.js';
import { Victory } from './victory.js';

const config = {
    width: 1920,
    height: 1080,
    type: Phaser.AUTO,
    parent: 'game-canvas',
    backgroundColor: '#000',
    scene: [LoadScene, Level1, Level2, Level1Multi, Menu, Victory],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
        },
        debug:true
    },
    pixelArt: true
}

new Phaser.Game(config);