import MenuItem from './MenuItem.js';

// `000`
// console.log();

const UI_STYLES = {
    // Box Colors
    titleBoxColor: 0x0000FF,
    mainBoxColor: 0x34495e,
    // Text Colors and Font Sizes
    textColor: "#ffffff",
    fontSizeLarge: "24px",
    fontSizeMedium: "20px",
    fontSizeSmall: "18px",
    // Button Color
    buttonColor: 0xe74c3c,
    // Optional: Background Color
    backgroundColor: 0x34495e,
};

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

        // **** LAYOUT
        this.menuSetting = {
            startX: 10,
            startY: 10,
            width: 400,
            headerHeight: 40,
            toggleImgScale: 0.5,
            contentHeight: 80,
            subHeaderHeight: 30
        };

        // Store menus for repositioning
        this.menuItems = [];
        
        // Menu headers
        this.testMenu = new MenuItem(this, this.menuSetting.startX, this.menuSetting.startY, this.menuSetting.width, 'TEST MENU1', 'test1');
        this.testMenu2 = new MenuItem(this, this.menuSetting.startX, this.menuSetting.startY, this.menuSetting.width, 'TEST MENU2', 'test2');
        this.menuItems.push(this.testMenu, this.testMenu2);

        // Menu contents
/*
        const bg = this.add.rectangle(0, 0, this.menuSetting.width, this.menuSetting.contentHeight, 0x334433).setOrigin(0);
        const label = this.add.text(10, 10, 'Content TEST MENU1...', {
          fontSize: '16px',
          color: '#ffffff'
        });
        const testMenuContent = this.add.container(0, 0);
        testMenuContent.add([bg, label]);
*/
        const bg2 = this.add.rectangle(0, 0, this.menuSetting.width, this.menuSetting.contentHeight, 0x334433).setOrigin(0);
        const label2 = this.add.text(10, 10, 'Content TEST MENU2...', {
          fontSize: '16px',
          color: '#ffffff'
        });
        const testMenuContent2 = this.add.container(0, 0);
        testMenuContent2.add([bg2, label2]);
        
        // Insert menu contents
        //this.testMenu.addContent(testMenuContent, 'test1');
        this.testMenu2.addContent(testMenuContent2, 'test2');
        
        // Sub menu items
        this.testMenu.addSubMenu('Sub Contents 1', 'sub1');
        this.testMenu.addSubMenu('Sub Contents 2', 'sub2');
        
        this.repositionBoxes();
    }

    // Lime up menus
    repositionBoxes() {
        let currentY = this.menuSetting.startY;
        
        for (const menu of this.menuItems) {
            if (menu) {
                menu.setY(currentY);
                currentY += menu.getHeight() + 4; // Add spacing
            }
        }
    }
} // MainScene

// Export default MainScene;
export default MainScene;