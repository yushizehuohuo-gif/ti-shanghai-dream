// ==========================================
// ui.js — UI 效果（打字机、转场、飘字）
// "我要打上海TI" 文字互动游戏
// ==========================================

const UI = {
  _typewriterTimer: null,
  _typewriterCallback: null,

  // --- Chapter Header ---
  setChapter(num) {
    const chapterNames = {
      1: '第一章 · 梦的起点',
      2: '第二章 · 刀塔江湖',
      3: '第三章 · 海选之路',
      4: '第四章 · 预选之巅',
      5: '第五章 · 上海之战',
      6: '第六章 · 终章',
    };

    document.getElementById('chapter-num').textContent = `CHAPTER ${num}`;
    document.getElementById('chapter-title').textContent = chapterNames[num] || '';
  },

  // --- Chapter Intro ---
  showChapterIntro(chapterNum, callback) {
    const chapterNames = {
      1: '第一章 · 梦的起点',
      2: '第二章 · 刀塔江湖',
      3: '第三章 · 海选之路',
      4: '第四章 · 预选之巅',
      5: '第五章 · 上海之战',
      6: '第六章 · 终章',
    };

    const area = document.getElementById('scene-area');
    const original = area.innerHTML;

    area.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:40vh;text-align:center;animation:fadeInUp 0.8s ease;">
        <div style="font-size:0.8rem;letter-spacing:6px;color:var(--gold-dim);margin-bottom:12px;">CHAPTER ${chapterNum}</div>
        <div style="font-size:2rem;font-weight:700;color:var(--gold);letter-spacing:4px;animation:fadeInUp 1s ease 0.2s both;">
          ${chapterNames[chapterNum] || ''}
        </div>
      </div>
    `;

    setTimeout(() => {
      area.innerHTML = original;
      if (callback) callback();
    }, 2000);
  },
  setSceneTitle(title) {
    const el = document.getElementById('scene-title');
    if (title) {
      el.textContent = title;
      el.classList.add('visible');
    } else {
      el.textContent = '';
      el.classList.remove('visible');
    }
  },

  // --- Typewriter ---
  typeText(text, callback) {
    this._cancelTypewriter();
    const el = document.getElementById('scene-text');
    el.textContent = '';

    if (!text) {
      if (callback) callback();
      return;
    }

    let i = 0;
    const chars = [...text]; // handle CJK characters
    const speed = 35; // ms per char

    this._typewriterCallback = callback;

    const tick = () => {
      if (i < chars.length) {
        el.textContent += chars[i];
        i++;
        // Faster for spaces/newlines, pause for punctuation
        const delay = chars[i - 1] === '。' || chars[i - 1] === '…' || chars[i - 1] === '！' || chars[i - 1] === '？'
          ? speed * 3
          : chars[i - 1] === '，' || chars[i - 1] === '；'
            ? speed * 2
            : speed;
        this._typewriterTimer = setTimeout(tick, delay);
      } else {
        // Add blinking cursor
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        el.appendChild(cursor);
        this._typewriterTimer = null;
        if (callback) callback();
      }
    };

    tick();
  },

  _cancelTypewriter() {
    if (this._typewriterTimer) {
      clearTimeout(this._typewriterTimer);
      this._typewriterTimer = null;
    }
  },

  // Instant text (skip typewriter)
  showText(text) {
    this._cancelTypewriter();
    const el = document.getElementById('scene-text');
    el.textContent = text;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);
  },

  // --- Choices ---
  clearChoices() {
    document.getElementById('choices-container').innerHTML = '';
  },

  // --- Flavor Text ---
  showFlavor(text) {
    const el = document.getElementById('scene-flavor');
    el.textContent = text;
    el.classList.remove('hidden');
    requestAnimationFrame(() => {
      el.classList.add('visible');
    });
  },

  hideFlavor() {
    const el = document.getElementById('scene-flavor');
    el.classList.remove('visible');
    el.classList.add('hidden');
    el.textContent = '';
  },

  // --- Continue Button ---
  showContinue(callback) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = '继续...';
    btn.addEventListener('click', () => {
      container.innerHTML = '';
      if (callback) callback();
    });
    container.appendChild(btn);
  },

  // --- Transitions ---
  transitionOut(callback) {
    const area = document.getElementById('scene-area');
    area.classList.add('fade-out');
    setTimeout(() => {
      if (callback) callback();
    }, 300);
  },

  transitionIn() {
    const area = document.getElementById('scene-area');
    area.classList.remove('fade-out');
    area.classList.add('fade-in');
    setTimeout(() => {
      area.classList.remove('fade-in');
    }, 400);
  },

  // --- Stats Display ---
  updateStats() {
    const stats = Stats.get();
    const changes = Stats.getLastChanges();

    const keys = ['实力', '心态', '人气', '团队'];
    const ids = ['skill', 'mentality', 'popularity', 'teamwork'];

    keys.forEach((key, i) => {
      const valEl = document.getElementById(`val-${ids[i]}`);
      const oldVal = parseInt(valEl.textContent) || stats[key];
      const newVal = stats[key];

      // Update value
      valEl.textContent = newVal;

      // Animate change
      const delta = changes[key];
      if (delta && delta !== 0) {
        valEl.classList.remove('changed-up', 'changed-down');
        void valEl.offsetWidth; // force reflow
        valEl.classList.add(delta > 0 ? 'changed-up' : 'changed-down');

        // Float animation
        this._showStatFloat(key, delta, valEl);
      }
    });
  },

  _showStatFloat(statName, delta, anchorEl) {
    const icons = { '实力': '🎯', '心态': '💪', '人气': '📣', '团队': '🤝' };
    const rect = anchorEl.getBoundingClientRect();

    const el = document.createElement('div');
    el.className = `stat-float ${delta > 0 ? 'up' : 'down'}`;
    el.textContent = `${icons[statName] || ''} ${delta > 0 ? '+' : ''}${delta}`;
    el.style.left = `${rect.left + rect.width / 2}px`;
    el.style.top = `${rect.top}px`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  // --- Minigame Area ---
  showMinigame() {
    document.getElementById('minigame-area').classList.remove('hidden');
  },

  hideMinigame() {
    document.getElementById('minigame-area').classList.add('hidden');
    document.getElementById('minigame-area').innerHTML = '';
  },

  getMinigameArea() {
    return document.getElementById('minigame-area');
  },

  // --- Start Screen ---
  showStartScreen() {
    const container = document.getElementById('game-container');
    const hasSave = SaveSystem.hasSave();

    container.innerHTML = `
      <div id="start-screen">
        <h1>我要打上海TI</h1>
        <div class="subtitle">一 个 D O T A 2 玩 家 的 逐 梦 之 旅</div>
        <button class="start-btn" id="btn-new-game">开始新游戏</button>
        ${hasSave ? '<button class="start-btn secondary" id="btn-continue">继续游戏</button>' : ''}
        <button class="start-btn secondary" id="btn-gallery-start">🏆 结局画廊</button>
      </div>
    `;

    document.getElementById('btn-new-game').addEventListener('click', () => {
      Stats.reset();
      GameEngine.state.playthroughCount = SaveSystem.getPlaythroughCount();
      GameEngine.state.choiceHistory = [];
      GameEngine.state.endingsUnlocked = SaveSystem.loadEndings();
      GameEngine.state.totalScenesSeen = new Set();
      GameEngine.state.testRecord = { reactionBest: {}, puzzleCorrect: 0, puzzleTotal: 0 };
      SaveSystem.clearSave();
      GameEngine.loadScene('ch1_s1_start');
    });

    if (hasSave) {
      document.getElementById('btn-continue').addEventListener('click', () => {
        GameEngine.init();
      });
    }

    document.getElementById('btn-gallery-start').addEventListener('click', () => {
      this.showEndingGallery();
    });
  },

  // --- Ending Screen ---
  showEndingScreen(endingData, unlockedCount, totalEndings, callback) {
    const container = document.getElementById('game-container');
    const ngCount = SaveSystem.getPlaythroughCount();

    // Save playthrough count
    SaveSystem.incrementPlaythrough();

    const isLegend = endingData.endingId === 10;
    const allUnlocked = unlockedCount >= 9;

    container.innerHTML = `
      <div id="start-screen" style="min-height: 60vh; padding-top: 40px;">
        <div style="font-size: 3rem; margin-bottom: 16px;">${endingData.endingIcon || '🏆'}</div>
        <h1 style="font-size: 1.8rem;">${endingData.endingTitle || '结局'}</h1>
        <div style="color: var(--text-dim); margin: 8px 0 24px;">
          ${endingData.endingRarity ? endingData.endingRarity + ' · ' : ''}第 ${ngCount} 周目
        </div>
        <p style="max-width: 500px; line-height: 2; margin-bottom: 16px; color: var(--text); white-space: pre-wrap;">
          ${endingData.endingText || ''}
        </p>
        <div style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 24px;">
          已解锁结局：${unlockedCount}/${totalEndings}
        </div>
        <button class="start-btn" id="btn-ng-plus">🔄 新的旅程（第 ${ngCount + 1} 周目）</button>
        <button class="start-btn secondary" id="btn-gallery-end">🏆 结局画廊</button>
        ${allUnlocked && !isLegend ? '<p style="color: var(--gold-dim); margin-top: 16px; font-size: 0.85rem;">🔮 所有结局已解锁...也许还有隐藏的？</p>' : ''}
      </div>
    `;

    document.getElementById('btn-ng-plus').addEventListener('click', () => {
      GameEngine.newGamePlus();
    });

    document.getElementById('btn-gallery-end').addEventListener('click', () => {
      this.showEndingGallery();
    });

    if (callback) callback();
  },

  // --- Ending Gallery ---
  showEndingGallery() {
    const container = document.getElementById('game-container');
    const unlocked = SaveSystem.loadEndings();

    const allEndings = [
      { id: 1, icon: '🏆', title: '上海之王', rarity: '传说', desc: '在TI上海站上最高领奖台，举起冠军神盾。' },
      { id: 2, icon: '🥈', title: '咫尺之遥', rarity: '稀有', desc: '进入决赛，但最终与冠军失之交臂。' },
      { id: 3, icon: '🥉', title: '四强荣耀', rarity: '稀有', desc: '杀入四强，世界记住了你的名字。' },
      { id: 4, icon: '🌟', title: '黑马奇迹', rarity: '稀有', desc: '从无人知晓到震惊世界，你是最大的黑马。' },
      { id: 5, icon: '📺', title: '解说新星', rarity: '常见', desc: '离开赛场，但你用另一种方式留在了DOTA。' },
      { id: 6, icon: '🎓', title: '冠军教头', rarity: '常见', desc: '你没能以选手身份登顶，但你带出了冠军。' },
      { id: 7, icon: '🌊', title: '主播之路', rarity: '常见', desc: '直播间的灯光，不比赛场暗淡。' },
      { id: 8, icon: '🔄', title: '明年再来', rarity: '常见', desc: '失败不是终点，你已经在备战下一届TI。' },
      { id: 9, icon: '💔', title: '遗憾退场', rarity: '常见', desc: '梦想暂时搁浅，但生活还在继续。' },
      { id: 10, icon: '🔮', title: '传奇不灭', rarity: '隐藏', desc: '？？？' },
      { id: 0, icon: '💨', title: '队伍解散', rarity: '中途', desc: '没能走到最后。有些梦，需要对的人一起追。' },
    ];

    container.innerHTML = `
      <div id="gallery-screen">
        <h2>🏆 结局画廊</h2>
        <p style="text-align:center;color:var(--text-dim);margin-bottom:24px;">
          已解锁 ${unlocked.length} / ${allEndings.length}
        </p>
        ${allEndings.map(e => {
          const isUnlocked = unlocked.includes(e.id);
          return `
            <div class="ending-card ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="ending-icon">${isUnlocked ? e.icon : '❓'}</div>
              <div class="ending-info">
                <h3>${isUnlocked ? e.title : '???'}</h3>
                <p>${isUnlocked ? e.rarity + ' · ' + e.desc : '尚未解锁'}</p>
              </div>
            </div>
          `;
        }).join('')}
        <div style="text-align:center;margin-top:24px;">
          <button class="start-btn secondary" onclick="UI.showStartScreen()">返回主菜单</button>
        </div>
      </div>
    `;
  },
};
