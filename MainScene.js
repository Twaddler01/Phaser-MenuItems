import MenuItem from './MenuItem.js';
import TextObj from './TextObj.js';
import EmptyObj from './EmptyObj.js';
import { menuConfig } from './menuConfig.js';

// `000`
// console.log();

export let scene = null;
export function setScene(s) {
    scene = s;
}

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('opened', 'assets/MenuItem_open.png');
        this.load.image('closed', 'assets/MenuItem_closed.png');
    }

    update() {
        //
    }

    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;
        // Game area rectangle
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x222222, 1); // Gray color
        this.graphics.fillRect(0, 0, width, height);
        this.graphics.setDepth(-1); // -1 ensures it's behind other game elements

// Pass scene
setScene(this);

new TextObj({
    parentMenu: 'Menu 1',
    x: 0,
    y: 0,
    align: 'center',
    width: 1,
    heightPX: 60,
    textColor: 'blue',
    backgroundColor: 'green',
});

new TextObj({
    parentMenu: 'Menu 1',
    x: 0,
    y: 0,
    align: 'left',
    width: 1,
    heightPX: 40,
    textColor: 'red',
    backgroundColor: 'pink',
});

// All properties
new TextObj({
    parentMenu: 'BOIIIIIIIIII',
    x: 0,
    y: 0,
    width: 1,
    heightPX: 80,
    text: 'Food',
    fontSize: '20px',
    align: 'right',
    textPadding: 40,
    textColor: 'yellow',
    backgroundColor: 'gray',
});

new TextObj({
    parentMenu: 'hellooo',
});

new TextObj({

});

    }
} // MainScene

// Export default MainScene;
export default MainScene;