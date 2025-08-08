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
        const bg = this.scene.add.rectangle(this.config.x, this.config.y, this.width, this.config.heightPX, 0x2222ff).setOrigin(0);
        const text = this.scene.add.text(10, this.config.heightPX / 2, 'TITLE', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);
    
        this.container.add([bg, text]);
    
    }
    
    //
}