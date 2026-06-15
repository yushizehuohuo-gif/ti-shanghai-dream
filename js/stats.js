// ==========================================
// stats.js — 数值系统
// "我要打上海TI" 文字互动游戏
// ==========================================

const Stats = {
  _values: {
    '实力': 50,
    '心态': 50,
    '人气': 50,
    '团队': 50,
  },

  _lastChanges: {},

  // --- Init ---
  init() {
    this._values = {
      '实力': 50,
      '心态': 50,
      '人气': 50,
      '团队': 50,
    };
    this._lastChanges = {};
  },

  // --- Getters ---
  get() {
    return { ...this._values };
  },

  getLastChanges() {
    return { ...this._lastChanges };
  },

  // --- Modify stats ---
  // effects: { "实力": 5, "心态": -3 }
  modify(effects) {
    if (!effects) return;
    this._lastChanges = {};

    for (const [key, delta] of Object.entries(effects)) {
      if (this._values[key] !== undefined) {
        const old = this._values[key];
        this._values[key] = Math.max(0, Math.min(100, old + delta));
        this._lastChanges[key] = this._values[key] - old;
      }
    }
  },

  // --- Set all (for loading saves) ---
  setAll(stats) {
    if (!stats) return;
    this._values = { ...this._values, ...stats };
  },

  // --- Reset ---
  reset() {
    this.init();
  },

  // --- Check threshold ---
  check(stat, threshold) {
    return (this._values[stat] || 0) >= threshold;
  },

  // --- Check multiple ---
  checkAll(requirements) {
    if (!requirements) return true;
    for (const [key, threshold] of Object.entries(requirements)) {
      if ((this._values[key] || 0) < threshold) return false;
    }
    return true;
  },
};
