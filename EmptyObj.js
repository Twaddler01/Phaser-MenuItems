import { scene } from './MainScene.js';
import MenuItem from './MenuItem.js';
import { menuConfig } from './menuConfig.js';

const globalMenus = {}; // Shared across all EmptyObj/TextObj
let globalObjCount = 0;

export const defaultConfig = {
  parentMenu: 'Default Menu',
  x: 0,
  y: 0,
  width: 1,
  heightPX: 50,
  backgroundColor: 'black',
  textColor: 'white',
  align: 'left',
  text: 'Default Menu Content',
  fontSize: '16px',
  textPadding: 10
};

export default class EmptyObj {
    constructor(config = {}) {
        this.scene = scene;
        this.config = { ...defaultConfig, ...config };
        this.parentMenus = globalMenus; // Use object to track by parentMenu ID

        this.width = this.config.width * menuConfig.width;
        this.container = this.scene.add.container(0, 0);
    }

    createMenu() {
        const parentId = this.config.parentMenu;
    
        if (parentId && parentId !== 'none') {
            let menuItem = this.parentMenus[parentId];
    
            if (!menuItem) {
                // Create the menu item
                menuItem = new MenuItem(
                    this.scene,
                    menuConfig.startX,
                    menuConfig.startY,
                    this.width,
                    parentId
                );
                this.parentMenus[parentId] = menuItem;
            }
    
            // Always add content — MenuItem handles stacking logic
            menuItem.addContent(this.container, 'object_' + globalObjCount);
            globalObjCount++;
    
            EmptyObj.repositionBoxes?.();
        }
    }

    static repositionBoxes() {
        let currentY = menuConfig.startY;

        for (const menu of Object.values(globalMenus)) {
            if (menu) {
                menu.setY(currentY);
                currentY += menu.getHeight() + 5;
            }
        }
    }

    setY(y) {
        this.container.y = y;
    }
    
    setColor(input) {
        const colorHex = {
            black:   0x000000,
            white:   0xffffff,
            red:     0xff0000,
            green:   0x00ff00,
            blue:    0x0000ff,
            yellow:  0xffff00,
            cyan:    0x00ffff,
            magenta: 0xff00ff,
            gray:    0x808080,
            orange:  0xffa500,
            purple:  0x800080,
            pink:    0xffc0cb,
            brown:   0x8b4513
        };
    
        let hexValue;
    
        if (typeof input === 'number') {
            // Already numeric (0x000000)
            hexValue = input;
    
        } else if (typeof input === 'string') {
            if (input.startsWith('#')) {
                // CSS hex string
                hexValue = parseInt(input.slice(1), 16);
            } else if (input.startsWith('0x')) {
                // Numeric hex string
                hexValue = parseInt(input, 16);
            } else {
                // Named color
                hexValue = colorHex[input.toLowerCase()] ?? 0x000000;
            }
        } else {
            hexValue = 0x000000; // Fallback to black
        }
    
        return {
            number: hexValue,
            string: `#${hexValue.toString(16).padStart(6, '0')}`
        };
    }
    
    //
}