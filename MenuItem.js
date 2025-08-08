import { menuConfig } from './menuConfig.js';
import EmptyObj from './EmptyObj.js';

export default class MenuItem {
    constructor(scene, x, y, width, label) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.label = label;
        this.expanded = false;
        this.contentContainers = {}; // Stores tagged content
        this.width = width;
        this.currentY = this.getContentStartY();
        
        // Sub menus
        this.contentAdded = false;
        this.subContentAdded = false;
        this.subMenuWidth = width - 5;
        this.subExpanded = {};
        this.subMemuContainer = scene.add.container(5, 5);
        this.subContentContainers = {};
        this.subMenuHeaders = [];
        this.currentSubY = this.getContentStartY();
        this.headerY = {};
        this.currentContentY = 0;

        this.buildHeader();
        this.setupInteraction();
    }

    buildHeader() {
        // Save the background so we can attach interaction to it
        this.bg = this.scene.add.rectangle(0, 0, this.width, menuConfig.headerHeight, 0x0000ff).setOrigin(0).setInteractive();

        this.toggleImg = this.scene.add.image(10, menuConfig.headerHeight / 2, 'closed').setScale(menuConfig.toggleImgScale).setOrigin(0, 0.5);

        const text = this.scene.add.text(10 + this.toggleImg.width * 2 * menuConfig.toggleImgScale, menuConfig.headerHeight / 2, this.label, {
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        this.container.add([this.bg, this.toggleImg, text]);
    }
    
    setupInteraction() {
        this.bg.on('pointerup', () => {
            this.toggle();
            // Optional: play click sound, animate, etc.
        });
    
        // Improve touch responsiveness:
        this.bg.on('pointerover', () => this.bg.setFillStyle(0x0000ff));
        this.bg.on('pointerout', () => this.bg.setFillStyle(0x0000ff));
    }

    getContentStartY() {
        return menuConfig.headerHeight + 5; // Below the header
    }
    
    getSubContentStartY() {
        const contentHeight = Object.values(this.contentContainers).reduce((sum, c) => {
            return c.visible ? sum + c.getBounds().height : sum;
        }, 0);
        if (!this.contentAdded) return 0;
        return menuConfig.headerHeight + menuConfig.subHeaderHeight + contentHeight + 5 + 10;
    }

    addContent(container, tag) {
        this.contentAdded = true;
    
        let yOffset = this.getContentStartY(); // start after header
        for (const c of Object.values(this.contentContainers)) {
            yOffset += c.height + 5; // add height of previous content + spacer
        }
    
        container.setY(yOffset);
        this.container.add(container); 
        this.contentContainers[tag] = container;
        container.setVisible(false)
        
        this.recalculateLayout();
    }
    
    addSubMenu(title, subTag) {
        this.subContentAdded = true;
        if (this.subContentContainers[subTag]) return;
    
        const headerContainer = this.scene.add.container(5, 0);
    
        const bg = this.scene.add.rectangle(0, 0, this.subMenuWidth, menuConfig.subHeaderHeight, 0x2222ff).setOrigin(0).setInteractive();
        const text = this.scene.add.text(10, menuConfig.subHeaderHeight / 2, title, {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);
    
        headerContainer.add([bg, text]);
    
        // Compute Y offset: after existing content + submenu headers + content
        let yOffset = this.getContentStartY();
        for (const c of Object.values(this.contentContainers)) {
            yOffset += c.height + 5;
        }
        for (const { header, content } of Object.values(this.subContentContainers)) {
            if (header) yOffset += header.height + 5;
            if (content) yOffset += content.height + 5;
        }
    
        headerContainer.setY(yOffset);
        headerContainer.setVisible(false);
        this.container.add(headerContainer);
    
        this.subMenuHeaders.push(subTag);
        this.subContentContainers[subTag] = {
            header: headerContainer,
            content: null,
            expanded: false
        };
    
        bg.on('pointerup', () => {
            this.toggleSub(subTag);
        });
    }
    
    addSubMenuContent(subContainer, subTag) {
        const entry = this.subContentContainers[subTag];
        if (!entry) return console.warn(`No subHeader for ${subTag}`);
    
        // Position right under the sub-header
        const headerY = entry.header.y;
        const headerHeight = menuConfig.subHeaderHeight;
        const spacer = 5;
    
        subContainer.setY(headerY + headerHeight + spacer);
        subContainer.setVisible(false);
        this.container.add(subContainer);
    
        entry.content = subContainer;
    }
    
    buildSubHeaders(subTag) {
        const subBg = this.scene.add.rectangle(0, this.currentSubY, this.subMenuWidth, menuConfig.subHeaderHeight, 0x222222ff).setOrigin(0).setInteractive();
        const spacer = this.scene.add.rectangle(0, subBg.y, this.subMenuWidth, menuConfig.subHeaderHeight + 5, 0x555555).setOrigin(0).setVisible(false);
        this.subMemuContainer.add([subBg, spacer]);

        this.subMemuContainer.setY(this.getSubContentStartY());
        this.subContentContainers[subTag] = this.subMemuContainer;
        this.subMemuContainer.setVisible(false); // Hide by default
        
        // Add to main container
        this.container.add(this.subMemuContainer);
        
        this.currentSubY += menuConfig.subHeaderHeight + 5;
        this.headerY[subTag] = this.currentSubY;
        
        subBg.on('pointerup', () => {
            this.toggleSub();
            // Optional: play click sound, animate, etc.
        });
        
        this.recalculateLayout();
    }

    toggleSub(subTag) {
        const entry = this.subContentContainers[subTag];
        if (!entry) return;
    
        entry.expanded = !entry.expanded;
        if (entry.content) {
            entry.content.setVisible(entry.expanded);
        }
    
        this.recalculateLayout();
        EmptyObj.repositionBoxes?.();
    }
    
    recalculateLayout() {
        let currentY = menuConfig.headerHeight + 5;
    
        // Reposition content containers
        for (const c of Object.values(this.contentContainers)) {
            c.setY(currentY);
            if (c.visible) {
                currentY += c.getBounds().height + 5;
            }
        }
    
        // Reposition submenus
        for (const { header, content, expanded } of Object.values(this.subContentContainers)) {
            if (header) {
                header.setY(currentY);
                if (header.visible) {
                    currentY += header.getBounds().height + 5;
                }
            }
    
            if (content) {
                content.setY(currentY);
                if (content.visible && expanded) {
                    currentY += content.getBounds().height + 5;
                }
            }
        }
    }

    remove(contentInstance) {
        if (!contentInstance.rows) return;
        
        // Remove input events for safety
        for (const row of Object.values(contentInstance.rows)) {
            if (row.bg?.removeAllListeners) {
                row.bg.removeAllListeners();
            }
        }
    
        contentInstance.rows = {};
        
        // Destroy all content containers
        for (const container of Object.values(this.contentContainers)) {
            container.destroy(true);
        }
    
        this.contentContainers = {};
    
        // Destroy main container
        this.container?.destroy(true);
        this.container = null;
    
        // Remove from tracking arrays
        this.scene.menuItems = this.scene.menuItems.filter(m => m !== this);
    
        EmptyObj.repositionBoxes?.();
    }

    toggle() {
        this.expanded = !this.expanded;
        this.toggleImg.setTexture(this.expanded ? 'opened' : 'closed');
    
        Object.values(this.contentContainers).forEach(c => c.setVisible(this.expanded));
    
        for (const { header, content, expanded } of Object.values(this.subContentContainers)) {
            header.setVisible(this.expanded);
            if (content) content.setVisible(this.expanded && expanded);
        }
    
        this.recalculateLayout();
        EmptyObj.repositionBoxes?.();
    }
    
    getHeight() {
        if (!this.expanded) return menuConfig.headerHeight;
    
        let height = menuConfig.headerHeight + 5;
    
        for (const c of Object.values(this.contentContainers)) {
            if (c.visible) height += c.getBounds().height + 5;
        }
    
        // Adjust for sub menus
        height -= 5;
        
        for (const { header, content, expanded } of Object.values(this.subContentContainers)) {
            if (header.visible) height += header.getBounds().height + 5;
            if (content?.visible && expanded) height += content.getBounds().height + 5;
        }
    
        return height;
    }

    setY(y) {
        this.container.y = y;
    }
}