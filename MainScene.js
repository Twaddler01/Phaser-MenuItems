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
    align: 'left',
    width: 1,
    heightPX: 60,
    textColor: 'white',
    backgroundColor: 'green',
});

new TextObj({
    parentMenu: 'Menu 1',
    x: 0,
    y: 0,
    align: 'left',
    width: 1,
    heightPX: 60,
    textColor: 'white',
    backgroundColor: 'green',
});

new TextObj({
    parentMenu: 'BOIIIIIIIIII',
    x: 0,
    y: 0,
    align: 'left',
    width: 1,
    heightPX: 60,
    textColor: 'white',
    backgroundColor: 'green',
});




/* // INTEGRATE ARRAY
        this.testMenu = new MenuItem(this, this.menuSetting.startX, this.menuSetting.startY, this.menuSetting.width, 'TEST MENU1', 'test1');
        this.testMenu2 = new MenuItem(this, this.menuSetting.startX, this.menuSetting.startY, this.menuSetting.width, 'TEST MENU2', 'test2');
        this.menuItems.push(this.testMenu, this.testMenu2);

        // Menu contents (manually stacked)
        const bg = this.add.rectangle(0, 0, this.menuSetting.width - 5, this.menuSetting.contentHeight, 0x334433).setOrigin(0);
        const label = this.add.text(10, 10, 'Content TEST MENU1...', {
          fontSize: '16px',
          color: '#ffffff'
        });
        const testSpacer = this.add.rectangle(0, bg.height, this.menuSetting.width - 5, 60, 0xffffff).setOrigin(0);
        //
        const testMenuContent = this.add.container(5, 0);
        testMenuContent.add([bg, label, testSpacer]);

        const bg2 = this.add.rectangle(0, 0, this.menuSetting.width - 5, this.menuSetting.contentHeight, 0x334433).setOrigin(0);
        const label2 = this.add.text(10, 10, 'Content TEST MENU2...', {
          fontSize: '16px',
          color: '#ffffff'
        });
        //
        const testMenuContent2 = this.add.container(5, 500); // y = 0
        testMenuContent2.add([bg2, label2]);

        const bg3 = this.add.rectangle(0, 0, this.menuSetting.width - 5, this.menuSetting.contentHeight, 0x334433).setOrigin(0);
        //
        const testMenuContent3 = this.add.container(5, 500); // y = 0
        testMenuContent3.add(bg3);
        
        // Insert menu contents
        this.testMenu.addContent(testMenuContent3, 'test1');
        //this.testMenu2.addContent(testMenuContent2, 'test2');
        
        // Sub menu items
        this.testMenu.addSubMenu('Sub Contents 1', 'sub1');
        this.testMenu.addSubMenuContent(testMenuContent, 'sub1');
        this.testMenu.addSubMenu('Sub Contents 2', 'sub2');
        this.testMenu.addSubMenuContent(testMenuContent2, 'sub2');
// INTEGRATE ARRAY */ 

        //this.repositionBoxes();
    }
} // MainScene

// Export default MainScene;
export default MainScene;