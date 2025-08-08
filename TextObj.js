import MenuItem from './MenuItem.js';
import EmptyObj from './EmptyObj.js';
import { menuConfig } from './menuConfig.js';

export default class TextObj extends EmptyObj {
    constructor(config = {}) {
        super(config);
        
        this.createMenu();
        this.createObj();
    }

    createObj() {
        const padding = this.config.textPadding;
    
        const bg = this.scene.add.rectangle(
            this.config.x, 
            this.config.y, 
            this.width, 
            this.config.heightPX, 
            this.setColor(this.config.backgroundColor).number
        ).setOrigin(0);
    
        const text = this.scene.add.text(
            padding, 
            this.config.heightPX / 2, 
            this.config.text, 
            {
                fontSize: this.config.fontSize,
                color: this.setColor(this.config.textColor).string
            }
        ).setOrigin(0, 0.5); // base origin left
    
        // Alignment updater
        const updateAlignment = () => {
            if (this.config.align === 'center') {
                text.setOrigin(0.5, 0.5);
                text.x = this.width / 2;
            }
            else if (this.config.align === 'right') {
                text.setOrigin(0, 0.5);
                text.x = this.width - padding - text.width;
            }
            else {
                text.setOrigin(0, 0.5);
                text.x = padding;
            }
        };
    
        // Run once now
        updateAlignment();
    
        // Patch setText to auto-update alignment
        const originalSetText = text.setText;
        text.setText = function(...args) {
            originalSetText.apply(this, args);
            updateAlignment();
            return this;
        };
    
        this.container.add([bg, text]);
    
        // Store text reference if you want to access later
        this.textObj = text;
    }
    
    //
}