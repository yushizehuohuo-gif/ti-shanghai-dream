// ==========================================
// engine.js — 核心游戏引擎
// "我要打上海TI" 文字互动游戏
// ==========================================

const GameEngine = {
  // --- State ---
  state: {
    currentSceneId: null,
    chapter: 1,
    choiceHistory: [],
    isTransitioning: false,
    playthroughCount: 1,
    endingsUnlocked: [],
    totalScenesSeen: new Set(),
    testRecord: {
      reactionBest: {},
      puzzleCorrect: 0,
      puzzleTotal: 0,
    },
  },

  // --- Stats (mirrored from Stats module) ---
  _stats: null,

  get stats() {
    if (!this._stats) this._stats = { ...Stats.get() };
    return this._stats;
  },

  // --- Init ---
  init(sceneId) {
    // Restore game UI if coming from start screen
    this._ensureGameUI();

    // Load save if exists
    const save = SaveSystem.load();
    if (save && !sceneId) {
      this.state.currentSceneId = save.sceneId;
      this.state.chapter = save.chapter;
      this.state.choiceHistory = save.choiceHistory || [];
      this.state.playthroughCount = save.playthroughCount || 1;
      this.state.endingsUnlocked = save.endingsUnlocked || [];
      this.state.totalScenesSeen = new Set(save.totalScenesSeen || []);
      this.state.testRecord = save.testRecord || { reactionBest: {}, puzzleCorrect: 0, puzzleTotal: 0 };
      Stats.setAll(save.stats);
      this._stats = null;
      this.loadScene(save.sceneId);
    } else if (sceneId) {
      this.loadScene(sceneId);
    } else {
      UI.showStartScreen();
    }
  },

  // Ensure game UI elements exist (restore after start screen)
  _ensureGameUI() {
    if (!document.getElementById('scene-area')) {
      // Rebuild game UI (preserve container)
      const container = document.getElementById('game-container');
      container.innerHTML = `
        <header id="chapter-header">
          <div id="chapter-num"></div>
          <h1 id="chapter-title"></h1>
        </header>
        <main id="scene-area">
          <div id="scene-title"></div>
          <div id="scene-text"></div>
          <div id="minigame-area" class="hidden"></div>
          <div id="scene-flavor" class="hidden"></div>
        </main>
        <div id="stats-panel">
          <div class="stat" id="stat-skill">
            <span class="stat-icon">🎯</span>
            <span class="stat-label">实力</span>
            <span class="stat-value" id="val-skill">50</span>
          </div>
          <div class="stat" id="stat-mentality">
            <span class="stat-icon">💪</span>
            <span class="stat-label">心态</span>
            <span class="stat-value" id="val-mentality">50</span>
          </div>
          <div class="stat" id="stat-popularity">
            <span class="stat-icon">📣</span>
            <span class="stat-label">人气</span>
            <span class="stat-value" id="val-popularity">50</span>
          </div>
          <div class="stat" id="stat-teamwork">
            <span class="stat-icon">🤝</span>
            <span class="stat-label">团队</span>
            <span class="stat-value" id="val-teamwork">50</span>
          </div>
        </div>
        <div id="choices-container"></div>
        <div id="menu-bar">
          <button id="btn-save" title="存档">💾</button>
          <button id="btn-load" title="读档">📂</button>
          <button id="btn-restart" title="重新开始">🔄</button>
          <button id="btn-gallery" title="结局画廊">🏆</button>
        </div>
      `;
      this._bindMenuButtons();
    }
  },

  _bindMenuButtons() {
    document.getElementById('btn-save').addEventListener('click', () => {
      this.save();
      const btn = document.getElementById('btn-save');
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = '💾'; }, 1000);
    });

    document.getElementById('btn-load').addEventListener('click', () => {
      if (SaveSystem.hasSave()) {
        this.init();
      }
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      if (confirm('确定要重新开始吗？当前进度将丢失。')) {
        Stats.reset();
        this.state.choiceHistory = [];
        this.state.totalScenesSeen = new Set();
        this.state.testRecord = { reactionBest: {}, puzzleCorrect: 0, puzzleTotal: 0 };
        SaveSystem.clearSave();
        this.loadScene('ch1_s1_start');
      }
    });

    document.getElementById('btn-gallery').addEventListener('click', () => {
      this.save();
      UI.showEndingGallery();
    });
  },

  // --- Scene Loading ---
  loadScene(sceneId) {
    if (this.state.isTransitioning) return;
    this.state.isTransitioning = true;

    // Ensure game UI is ready (in case coming from start screen)
    this._ensureGameUI();

    const scene = StoryData[sceneId];
    if (!scene) {
      console.error(`Scene not found: ${sceneId}`);
      this.state.isTransitioning = false;
      return;
    }

    this.state.currentSceneId = sceneId;
    const prevChapter = this.state.chapter;
    this.state.chapter = scene.chapter;
    this.state.totalScenesSeen.add(sceneId);

    // Run on_enter effects
    if (scene.on_enter) {
      Stats.modify(scene.on_enter);
    }

    UI.transitionOut(() => {
      UI.clearChoices();
      UI.hideMinigame();
      UI.hideFlavor();

      // Update chapter header
      UI.setChapter(scene.chapter);
      UI.updateStats();

      // Chapter transition effect
      const isNewChapter = prevChapter !== scene.chapter && prevChapter !== null;
      const renderScene = () => {
        switch (scene.type) {
          case 'reaction':
            this.renderReaction(scene);
            break;
          case 'puzzle':
            this.renderPuzzle(scene);
            break;
          case 'ending':
            this.renderEnding(scene);
            break;
          default:
            this.renderChoice(scene);
        }
        UI.transitionIn();
        this.state.isTransitioning = false;
      };

      if (isNewChapter) {
        UI.showChapterIntro(scene.chapter, renderScene);
      } else {
        renderScene();
      }
    });
  },

  // --- Choice Scene ---
  renderChoice(scene) {
    // Show scene title
    UI.setSceneTitle(scene.title || '');

    // Typewriter the scene text
    UI.typeText(scene.text, () => {
      // Show choices after text is done
      this.renderChoices(scene.choices);
    });
  },

  renderChoices(choices) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    const ngPlus = this.state.playthroughCount >= 2;
    const ngPlusPlus = this.state.playthroughCount >= 3;

    // NG++ indicator
    if (ngPlusPlus) {
      const indicator = document.createElement('div');
      indicator.className = 'minigame-hint';
      indicator.style.cssText = 'color: var(--gold); margin-bottom: 8px;';
      indicator.textContent = '🔮 命运之眼已开启 — 你能看到未走过的路';
      container.appendChild(indicator);
    } else if (ngPlus) {
      const indicator = document.createElement('div');
      indicator.className = 'minigame-hint';
      indicator.style.cssText = 'color: var(--gold-dim); margin-bottom: 8px;';
      indicator.textContent = '✨ 直觉 — 你能感知每个选择带来的影响';
      container.appendChild(indicator);
    }

    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';

      // Check conditions
      if (choice.condition) {
        const met = this.checkCondition(choice.condition);
        if (!met) {
          // NG+ might unlock hidden options
          if (ngPlusPlus && choice.ngPlus) {
            btn.className = 'choice-btn ng-plus';
            btn.innerHTML = this._formatChoiceWithEffects(choice, ngPlus);
          } else if (choice.lockedText) {
            btn.className = 'choice-btn locked';
            btn.textContent = `🔒 ${choice.lockedText}`;
          } else {
            btn.className = 'choice-btn locked';
            btn.textContent = `🔒 ${choice.text}`;
            btn.disabled = true;
          }
          container.appendChild(btn);
          return;
        }
      }

      btn.innerHTML = this._formatChoiceWithEffects(choice, ngPlus);
      btn.addEventListener('click', () => this.makeChoice(choice));
      container.appendChild(btn);
    });

    // Add number shortcuts
    this._numberChoices();
  },

  _formatChoiceWithEffects(choice, showEffects) {
    let html = choice.text;
    if (showEffects && choice.effects && Object.keys(choice.effects).length > 0) {
      const icons = { '实力': '🎯', '心态': '💪', '人气': '📣', '团队': '🤝' };
      const parts = [];
      for (const [key, val] of Object.entries(choice.effects)) {
        if (val !== 0) {
          const icon = icons[key] || '';
          const sign = val > 0 ? '+' : '';
          parts.push(`${icon}${sign}${val}`);
        }
      }
      if (parts.length > 0) {
        html += ` <span style="font-size:0.75rem;opacity:0.6;">${parts.join(' ')}</span>`;
      }
    }
    return html;
  },

  // Number the visible choices
  _numberChoices() {
    const btns = document.querySelectorAll('#choices-container .choice-btn:not(.locked)');
    btns.forEach((btn, i) => {
      if (i < 4) {
        const numSpan = document.createElement('span');
        numSpan.style.cssText = 'color:var(--gold-dim);margin-right:8px;font-size:0.7rem;';
        numSpan.textContent = `${i + 1}`;
        btn.prepend(numSpan);
      }
    });
  },

  // --- Reaction Scene ---
  renderReaction(scene) {
    UI.typeText(scene.text, () => {
      const ch = scene.challenge;
      Minigames.runReaction(ch, (result) => {
        // Apply effects
        const effects = result.success ? ch.effects_success : ch.effects_fail;
        if (effects && Object.keys(effects).length > 0) {
          Stats.modify(effects);
          UI.updateStats();
        }

        // Show flavor
        const flavor = result.success ? ch.flavor_success : ch.flavor_fail;
        UI.showFlavor(flavor);

        // Update test record
        if (result.success && result.score !== undefined) {
          const mode = ch.mode;
          if (!this.state.testRecord.reactionBest[mode] ||
              result.score > this.state.testRecord.reactionBest[mode]) {
            this.state.testRecord.reactionBest[mode] = result.score;
          }
        }

        // Next scene
        const nextId = result.success ? (ch.next_success || ch.next_correct) : (ch.next_fail || ch.next_wrong);
        UI.showContinue(() => this.loadScene(nextId));
      });
    });
  },

  // --- Puzzle Scene ---
  renderPuzzle(scene) {
    UI.typeText(scene.text, () => {
      const ch = scene.challenge;
      Minigames.runPuzzle(ch, (result) => {
        const effects = result.correct ? ch.effects_correct : ch.effects_wrong;
        if (effects && Object.keys(effects).length > 0) {
          Stats.modify(effects);
          UI.updateStats();
        }

        // Track puzzle stats
        this.state.testRecord.puzzleTotal++;
        if (result.correct) this.state.testRecord.puzzleCorrect++;

        const nextId = result.correct ? (ch.next_correct || ch.next_success) : (ch.next_wrong || ch.next_fail);
        UI.showContinue(() => this.loadScene(nextId));
      });
    });
  },

  // --- Ending Scene ---
  renderEnding(scene) {
    // Record ending
    if (!this.state.endingsUnlocked.includes(scene.endingId)) {
      this.state.endingsUnlocked.push(scene.endingId);
      SaveSystem.saveEndings(this.state.endingsUnlocked);
    }

    // Show ending screen directly (no typewriter for endings)
    const endingData = {
      endingIcon: scene.endingIcon || '🏆',
      endingTitle: scene.endingTitle || '结局',
      endingRarity: scene.endingRarity || '',
      endingText: scene.endingText || scene.text || '',
      endingId: scene.endingId,
    };

    const unlockedCount = this.state.endingsUnlocked.length;
    const totalEndings = 10;

    UI.showEndingScreen(endingData, unlockedCount, totalEndings, () => {
      this.newGamePlus();
    });
  },

  // --- Choice Handler ---
  makeChoice(choice) {
    if (this.state.isTransitioning) return;

    // Apply stat effects
    if (choice.effects && Object.keys(choice.effects).length > 0) {
      Stats.modify(choice.effects);
      UI.updateStats();
    }

    // Handle null next (return to menu)
    if (!choice.next) {
      this.save();
      UI.showStartScreen();
      return;
    }

    // Show flavor text if any
    if (choice.flavor) {
      UI.showFlavor(choice.flavor);
      // Wait a bit then transition
      setTimeout(() => {
        this.state.choiceHistory.push(this.state.currentSceneId);
        this.save();
        this.loadScene(choice.next);
      }, 1500);
    } else {
      this.state.choiceHistory.push(this.state.currentSceneId);
      this.save();
      this.loadScene(choice.next);
    }
  },

  // --- Condition Checker ---
  checkCondition(cond) {
    if (!cond) return true;

    // Special meta-conditions
    if (cond._playthrough && this.state.playthroughCount < cond._playthrough) return false;
    if (cond._allEndings) {
      const unlocked = SaveSystem.loadEndings();
      if (unlocked.length < 9) return false;
    }

    const s = Stats.get();
    const map = { skill: '实力', mentality: '心态', popularity: '人气', teamwork: '团队' };

    for (const [key, threshold] of Object.entries(cond)) {
      if (key.startsWith('_')) continue; // skip meta keys
      const statKey = map[key] || key;
      if ((s[statKey] || 0) < threshold) return false;
    }
    return true;
  },

  // --- New Game Plus ---
  newGamePlus() {
    this.state.playthroughCount++;
    this.state.choiceHistory = [];
    this._stats = null;
    Stats.reset();
    UI.updateStats();
    SaveSystem.clearSave();
    // Go back to chapter 1
    this.loadScene('ch1_s1_start');
  },

  // --- Save ---
  save() {
    SaveSystem.save({
      sceneId: this.state.currentSceneId,
      chapter: this.state.chapter,
      stats: Stats.get(),
      choiceHistory: this.state.choiceHistory,
      playthroughCount: this.state.playthroughCount,
      endingsUnlocked: this.state.endingsUnlocked,
      totalScenesSeen: [...this.state.totalScenesSeen],
      testRecord: this.state.testRecord,
    });
  },
};

// --- Boot ---
document.addEventListener('DOMContentLoaded', () => {
  GameEngine.init();

  // Bind menu buttons if game UI is present (not start screen)
  const saveBtn = document.getElementById('btn-save');
  if (saveBtn) {
    GameEngine._bindMenuButtons();
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Space/Enter: click first available continue or choice button
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const continueBtn = document.querySelector('#choices-container .choice-btn:not(.locked)');
      if (continueBtn) continueBtn.click();
      return;
    }
    // Number keys 1-4: select choice by index
    if (e.key >= '1' && e.key <= '4') {
      e.preventDefault();
      const idx = parseInt(e.key) - 1;
      const btns = document.querySelectorAll('#choices-container .choice-btn:not(.locked)');
      if (btns[idx]) btns[idx].click();
    }
  });

  // Auto-save on page unload
  window.addEventListener('beforeunload', () => {
    GameEngine.save();
  });
});
