import { scene } from './MainScene.js';
import MenuItem from './MenuItem.js';
import { menuConfig } from './menuConfig.js';

const globalMenus = {}; // Shared across all EmptyObj/TextObj
let globalObjCount = 0;

export default class EmptyObj {
    constructor(config = {}) {
        this.scene = scene;
        this.config = config;
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
}