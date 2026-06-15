// ==========================================
// minigames.js — 反应测试 + 逻辑推理引擎
// "我要打上海TI" 文字互动游戏
// ==========================================

const Minigames = {
  // ============================================
  // Reaction Tests
  // ============================================

  runReaction(challenge, callback) {
    UI.showMinigame();
    UI.clearChoices();
    const area = UI.getMinigameArea();

    switch (challenge.mode) {
      case 'click_target':
        this._reactionClickTarget(area, challenge, callback);
        break;
      case 'rapid_click':
        this._reactionRapidClick(area, challenge, callback);
        break;
      case 'timing':
        this._reactionTiming(area, challenge, callback);
        break;
      case 'sequence':
        this._reactionSequence(area, challenge, callback);
        break;
      default:
        console.error('Unknown reaction mode:', challenge.mode);
        callback({ success: true });
    }
  },

  // --- Click Target ---
  // A signal appears at a random position, player must click it within time limit
  _reactionClickTarget(area, challenge, callback) {
    const timeLimit = challenge.time_limit || 3000;

    area.innerHTML = `
      <div class="reaction-timer" id="reaction-timer">${(timeLimit / 1000).toFixed(1)}s</div>
      <div class="minigame-hint">点击出现的红色信号！</div>
      <div class="reaction-target" id="reaction-zone"></div>
    `;

    const zone = document.getElementById('reaction-zone');
    const timerEl = document.getElementById('reaction-timer');
    let startTime = Date.now();
    let clicked = false;
    let timerInterval;

    // Spawn signal
    const spawnSignal = () => {
      const x = 20 + Math.random() * 60; // % position
      const y = 20 + Math.random() * 60;
      const signal = document.createElement('div');
      signal.className = 'reaction-signal';
      signal.style.left = `${x}%`;
      signal.style.top = `${y}%`;

      signal.addEventListener('click', (e) => {
        e.stopPropagation();
        if (clicked) return;
        clicked = true;
        clearInterval(timerInterval);
        const reactionTime = Date.now() - startTime;

        signal.style.background = 'var(--success)';
        signal.style.boxShadow = '0 0 20px rgba(78,205,196,0.5)';

        const result = {
          success: true,
          score: reactionTime,
        };

        area.innerHTML += `
          <div class="reaction-result success">
            反应时间：${reactionTime}ms — 完美！
          </div>
        `;
        setTimeout(() => callback(result), 800);
      });

      zone.appendChild(signal);
    };

    // Countdown
    let remaining = timeLimit;
    timerEl.textContent = `${(remaining / 1000).toFixed(1)}s`;
    timerInterval = setInterval(() => {
      remaining -= 100;
      timerEl.textContent = `${Math.max(0, remaining / 1000).toFixed(1)}s`;
      if (remaining <= 1000) timerEl.classList.add('urgent');
      if (remaining <= 0 && !clicked) {
        clearInterval(timerInterval);
        clicked = true;
        area.innerHTML += `
          <div class="reaction-result fail">
            超时了...但队友及时补位！
          </div>
        `;
        setTimeout(() => callback({ success: false }), 800);
      }
    }, 100);

    // Slight delay before signal appears
    setTimeout(spawnSignal, 500 + Math.random() * 500);
  },

  // --- Rapid Click ---
  // Click as fast as possible to reach target within time
  _reactionRapidClick(area, challenge, callback) {
    const timeLimit = challenge.time_limit || 5000;
    const targetClicks = challenge.target_clicks || 15;

    area.innerHTML = `
      <div class="reaction-timer" id="reaction-timer">${(timeLimit / 1000).toFixed(0)}s</div>
      <div class="minigame-hint">疯狂点击下方区域！目标：${targetClicks}次</div>
      <div class="rapid-click-area" id="rapid-zone">
        <div class="rapid-click-count" id="click-count">0</div>
        <div class="rapid-click-target">/ ${targetClicks}</div>
      </div>
    `;

    const clickZone = document.getElementById('rapid-zone');
    const countEl = document.getElementById('click-count');
    const timerEl = document.getElementById('reaction-timer');
    let clicks = 0;
    let started = false;
    let finished = false;
    let timerInterval;

    const startGame = () => {
      if (started || finished) return;
      started = true;
      const startTime = Date.now();

      timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = timeLimit - elapsed;
        timerEl.textContent = `${Math.max(0, remaining / 1000).toFixed(1)}s`;
        if (remaining <= 1000) timerEl.classList.add('urgent');

        if (remaining <= 0 && !finished) {
          finished = true;
          clearInterval(timerInterval);
          clickZone.style.pointerEvents = 'none';
          const success = clicks >= targetClicks;
          area.innerHTML += `
            <div class="reaction-result ${success ? 'success' : 'fail'}">
              ${success ? `点了 ${clicks} 次！手速惊人！` : `点了 ${clicks} 次，没到目标...但对手也失误了`}
            </div>
          `;
          setTimeout(() => callback({ success, score: clicks }), 800);
        }
      }, 100);
    };

    clickZone.addEventListener('click', () => {
      if (finished) return;
      if (!started) startGame();
      clicks++;
      countEl.textContent = clicks;

      if (clicks >= targetClicks && !finished) {
        finished = true;
        clearInterval(timerInterval);
        clickZone.style.borderColor = 'var(--success)';
        clickZone.style.pointerEvents = 'none';
        area.innerHTML += `
          <div class="reaction-result success">
            点了 ${clicks} 次！手速惊人！
          </div>
        `;
        setTimeout(() => callback({ success: true, score: clicks }), 800);
      }
    });
  },

  // --- Timing ---
  // A progress bar moves, stop it in the sweet zone
  _reactionTiming(area, challenge, callback) {
    const zoneStart = challenge.timing_zone ? challenge.timing_zone[0] : 0.7;
    const zoneEnd = challenge.timing_zone ? challenge.timing_zone[1] : 0.85;

    area.innerHTML = `
      <div class="minigame-hint">在金色区域按下「停止」！</div>
      <div class="timing-bar-container" id="timing-bar-container">
        <div class="timing-zone" style="left:${zoneStart * 100}%;width:${(zoneEnd - zoneStart) * 100}%;"></div>
        <div class="timing-bar-fill" id="timing-fill" style="width:0%"></div>
      </div>
      <div style="text-align:center;margin-top:12px;">
        <button class="choice-btn" id="timing-stop" style="width:auto;display:inline-block;">⏹ 停止！</button>
      </div>
    `;

    const fill = document.getElementById('timing-fill');
    const stopBtn = document.getElementById('timing-stop');
    let position = 0;
    let direction = 1; // 1 = right, -1 = left
    const speed = 0.8; // % per frame
    let running = true;
    let finished = false;

    const animate = () => {
      if (!running) return;
      position += direction * speed;
      if (position >= 100) { position = 100; direction = -1; }
      if (position <= 0) { position = 0; direction = 1; }
      fill.style.width = `${position}%`;
      if (running) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    stopBtn.addEventListener('click', () => {
      if (finished) return;
      finished = true;
      running = false;
      const inZone = position >= zoneStart * 100 && position <= zoneEnd * 100;
      stopBtn.disabled = true;
      stopBtn.textContent = inZone ? '✓ 完美！' : '好的...';

      area.innerHTML += `
        <div class="reaction-result ${inZone ? 'success' : 'fail'}">
          ${inZone ? '时机完美！就像训练了千百遍的肌肉记忆。' : '差了一点...但这一波信息更重要，下波再来。'}
        </div>
      `;
      setTimeout(() => callback({ success: inZone }), 800);
    });
  },

  // --- Sequence ---
  // Remember and click dots in correct order
  _reactionSequence(area, challenge, callback) {
    const sequence = challenge.sequence || ['mid', 'top', 'bot'];
    const timeLimit = challenge.time_limit || 5000;

    area.innerHTML = `
      <div class="reaction-timer" id="reaction-timer">${(timeLimit / 1000).toFixed(1)}s</div>
      <div class="minigame-hint">记住顺序，然后依次点击！</div>
      <div class="sequence-display" id="seq-display">
        ${sequence.map((_, i) => `<div class="sequence-dot" id="seq-dot-${i}"></div>`).join('')}
      </div>
    `;

    // Show sequence first
    const dots = sequence.map((_, i) => document.getElementById(`seq-dot-${i}`));
    let showIndex = 0;

    const showNext = () => {
      if (showIndex < sequence.length) {
        dots[showIndex].classList.add('active');
        setTimeout(() => {
          dots[showIndex].classList.remove('active');
          showIndex++;
          setTimeout(showNext, 200);
        }, 600);
      } else {
        // Add click targets
        area.innerHTML += `
          <div style="display:flex;gap:12px;justify-content:center;margin-top:16px;" id="seq-targets">
            ${sequence.map((s, i) => `
              <button class="choice-btn seq-target" data-seq="${s}" style="width:80px;text-align:center;padding:10px;">
                ${s === 'top' ? '上路' : s === 'mid' ? '中路' : s === 'bot' ? '下路' : s}
              </button>
            `).join('')}
          </div>
        `;

        let currentStep = 0;
        let finished = false;
        const timerEl = document.getElementById('reaction-timer');
        const startTime = Date.now();
        let timerInterval;

        timerInterval = setInterval(() => {
          const remaining = timeLimit - (Date.now() - startTime);
          timerEl.textContent = `${Math.max(0, remaining / 1000).toFixed(1)}s`;
          if (remaining <= 1000) timerEl.classList.add('urgent');
          if (remaining <= 0 && !finished) {
            finished = true;
            clearInterval(timerInterval);
            area.innerHTML += `
              <div class="reaction-result fail">
                时间到！但信息已经记下了，下次团战用得上。
              </div>
            `;
            setTimeout(() => callback({ success: false }), 800);
          }
        }, 100);

        document.querySelectorAll('.seq-target').forEach(btn => {
          btn.addEventListener('click', () => {
            if (finished) return;
            const val = btn.dataset.seq;

            if (val === sequence[currentStep]) {
              dots[currentStep].classList.add('active');
              dots[currentStep].style.borderColor = 'var(--success)';
              dots[currentStep].style.background = 'rgba(78,205,196,0.2)';
              btn.classList.add('selected-correct');
              btn.disabled = true;
              currentStep++;

              if (currentStep >= sequence.length) {
                finished = true;
                clearInterval(timerInterval);
                area.innerHTML += `
                  <div class="reaction-result success">
                    顺序正确！团战目标清晰，一波漂亮的反击！
                  </div>
                `;
                setTimeout(() => callback({ success: true, score: Date.now() - startTime }), 800);
              }
            } else {
              finished = true;
              clearInterval(timerInterval);
              btn.classList.add('selected-wrong');
              area.innerHTML += `
                <div class="reaction-result fail">
                  点错了！但队友帮你补上了控制链。
                </div>
              `;
              setTimeout(() => callback({ success: false }), 800);
            }
          });
        });
      }
    };

    setTimeout(showNext, 500);
  },

  // ============================================
  // Logic Puzzles
  // ============================================

  runPuzzle(challenge, callback) {
    UI.showMinigame();
    UI.clearChoices();
    const area = UI.getMinigameArea();

    switch (challenge.mode) {
      case 'lineup_puzzle':
      case 'bp_deduce':
      case 'map_read':
      case 'item_build':
      case 'intel_verify':
      default:
        this._puzzleMultipleChoice(area, challenge, callback);
        break;
    }
  },

  // --- Multiple Choice Puzzle ---
  _puzzleMultipleChoice(area, challenge, callback) {
    area.innerHTML = `
      <div class="minigame-hint">做出你的选择</div>
      ${challenge.context ? `<div class="puzzle-context">${challenge.context}</div>` : ''}
      <div class="puzzle-options" id="puzzle-options">
        ${challenge.options.map((opt, i) => `
          <button class="puzzle-option" data-index="${i}" data-correct="${opt.correct}">
            ${opt.id ? `<strong>${opt.id}.</strong> ` : ''}${opt.text}
          </button>
        `).join('')}
      </div>
      <div id="puzzle-reason"></div>
    `;

    const options = document.querySelectorAll('.puzzle-option');
    const reasonEl = document.getElementById('puzzle-reason');
    let answered = false;

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const idx = parseInt(btn.dataset.index);
        const opt = challenge.options[idx];
        const correct = opt.correct;

        // Disable all
        options.forEach(b => b.style.pointerEvents = 'none');

        // Highlight selection
        btn.classList.add(correct ? 'selected-correct' : 'selected-wrong');

        // Reveal correct answer if wrong
        if (!correct) {
          options.forEach((b, i) => {
            if (challenge.options[i].correct) {
              b.classList.add('reveal-correct');
            }
          });
        }

        // Show reason
        reasonEl.innerHTML = `
          <div class="puzzle-reason ${correct ? 'correct' : 'wrong'}">
            ${correct ? challenge.flavor_correct : challenge.flavor_wrong}
            ${!correct && opt.reason ? `<br><br><span style="font-size:0.85rem;opacity:0.8;">${opt.reason}</span>` : ''}
          </div>
        `;

        setTimeout(() => callback({ correct }), 1500);
      });
    });
  },
};
