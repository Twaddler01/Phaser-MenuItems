import { gameData } from '../assets/data/data.js';
import { SaveManager } from '../assets/tools/SaveManager.js';

export default class MenuContentGather {
  constructor(scene, x, y, width, parentMenu) {
    this.scene = scene;
    this.container = scene.add.container(x, y);
    this.parentMenu = parentMenu;
    this.width = width;

    this.rows = {}; // key = gather ID
    this.refresh();
  }

  refresh() {
    if (this.container) this.container.removeAll(true);
    this.rows = {};

    const gatherList = this.scene.runtimeState.gather;
    gatherList.forEach((entry, index) => {
        const row = this.createRow(entry.id, index);
        this.container.add(row);
        this.rows[entry.id] = row;
    });

    // For add & removal
    this.scene.repositionBoxes?.(); // Repositioning logic
  }

  createRow(id, index) {
    const itemY = index * 42;

    const bg = this.scene.add.rectangle(0, itemY, this.width, 40, 0x334433).setOrigin(0);
    const label = this.scene.add.text(10, itemY + 10, this.formatLabel(id), {
      fontSize: '16px',
      color: '#ffffff'
    });

    bg.setInteractive().on('pointerdown', () => {
        this.handleGatherClick(id);
    });

    return this.scene.add.container(0, 0, [bg, label]);
  }

    handleGatherClick(id) {
        SaveManager.currentSave.inventory[id]++;
        SaveManager.debouncedSave(SaveManager.currentSave);
        this.scene.refreshCountStatus();
    }

  formatLabel(id) {
    return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  addGatherable(id) {
    const item = gameData.gather.find(g => g.id === id);
    if (!item) return;

    const unlocked = SaveManager.currentSave.unlocked.gather;
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      SaveManager.debouncedSave(SaveManager.currentSave);
      this.scene.runtimeState.gather = gameData.gather.filter(g => unlocked.includes(g.id));
      // Add to inventory
      this.scene.inventoryDisplay.addItem(id);
      this.refresh();
    }
  }

  removeGatherable(id) {
    const unlocked = SaveManager.currentSave.unlocked.gather;
    const index = unlocked.indexOf(id);
    if (index !== -1) {
      unlocked.splice(index, 1);
      SaveManager.debouncedSave(SaveManager.currentSave);
      this.scene.runtimeState.gather = gameData.gather.filter(g => unlocked.includes(g.id));
      // Remove from inventory
      this.scene.inventoryDisplay.removeItem(id);
      this.refresh();
    }
  }
}