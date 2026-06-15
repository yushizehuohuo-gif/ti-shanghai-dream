// ==========================================
// save.js — 存档/读档/多周目追踪
// "我要打上海TI" 文字互动游戏
// ==========================================

const SaveSystem = {
  SAVE_KEY: 'ti_shanghai_save',
  ENDINGS_KEY: 'ti_shanghai_endings',
  PLAYTHROUGH_KEY: 'ti_shanghai_playthrough',

  // --- Save ---
  save(data) {
    try {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('Save failed:', e);
      return false;
    }
  },

  // --- Load ---
  load() {
    try {
      const raw = localStorage.getItem(this.SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Load failed:', e);
      return null;
    }
  },

  // --- Clear save ---
  clearSave() {
    localStorage.removeItem(this.SAVE_KEY);
  },

  // --- Endings ---
  saveEndings(endings) {
    try {
      localStorage.setItem(this.ENDINGS_KEY, JSON.stringify(endings));
    } catch (e) {
      console.warn('Save endings failed:', e);
    }
  },

  loadEndings() {
    try {
      const raw = localStorage.getItem(this.ENDINGS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  // --- Playthrough ---
  getPlaythroughCount() {
    try {
      return parseInt(localStorage.getItem(this.PLAYTHROUGH_KEY)) || 1;
    } catch (e) {
      return 1;
    }
  },

  incrementPlaythrough() {
    const count = this.getPlaythroughCount() + 1;
    localStorage.setItem(this.PLAYTHROUGH_KEY, String(count));
    return count;
  },

  // --- Has existing save ---
  hasSave() {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  },
};
