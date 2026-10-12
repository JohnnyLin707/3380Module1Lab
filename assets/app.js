/* ============================================================
 * 3380 Module 1 · JS Refresher Review — 交互逻辑
 * ============================================================ */
(function () {
  'use strict';

  var SECTIONS = window.SECTIONS || [];
  var LS_MASTER = '3380-m1-mastered';
  var LS_THEME = '3380-m1-theme';

  var navEl = document.getElementById('nav');
  var contentEl = document.getElementById('content');
  var searchBox = document.getElementById('searchBox');
  var progressFill = document.getElementById('progressFill');
  var progressText = document.getElementById('progressText');

  var mastered = load(LS_MASTER, []);
  var totalQuestions = SECTIONS.reduce(function (n, s) { return n + s.questions.length; }, 0);

  /* ---------- 工具函数 ---------- */
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* 忽略隐私模式错误 */ }
  }
  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* 支持 `行内代码` 标记 */
  function mdInline(str) {
    return escapeHtml(str).replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  /* 极简语法高亮：一次分词，避免二次替换破坏标签 */
  function highlight(text) {
    var re = /(`[^`\n]*`|"[^"]*"|'[^']*')|\b(const|let|var|function|return|if|else|new|class|typeof|true|false|null|undefined)\b|\b(\d+(?:\.\d+)?)\b/g;
    var out = '', last = 0, m;
    while ((m = re.exec(text)) !== null) {
      out += escapeHtml(text.slice(last, m.index));
      if (m[1]) out += '<span class="str">' + escapeHtml(m[1]) + '</span>';
      else if (m[2]) out += '<span class="kw">' + escapeHtml(m[2]) + '</span>';
      else out += '<span class="num">' + escapeHtml(m[3]) + '</span>';
      last = m.index + m[0].length;
    }
    return out + escapeHtml(text.slice(last));
  }
  function normalize(str) {
    return String(str).trim().toLowerCase().replace(/\s+/g, '');
  }

  /* ---------- 渲染导航 ---------- */
  function renderNav() {
    var html = '';
    SECTIONS.forEach(function (sec) {
      html += '<a class="nav-link" href="#' + sec.id + '">' +
        '<span class="num">' + sec.no + '</span>' +
        '<span><strong>' + escapeHtml(sec.titleZh) + '</strong>' +
        '<small>' + escapeHtml(sec.titleEn) + '</small></span></a>';
    });
    navEl.innerHTML = html;
  }

  /* ---------- 渲染单个题目卡片 ---------- */
  function renderCard(sec, q) {
    /* 代码 + 填空输入框 */
    var parts = q.template.split('___');
    var codeHtml = '';
    parts.forEach(function (part, i) {
      codeHtml += highlight(part);
      if (i < q.blanks.length) {
        var ans = q.blanks[i];
        var size = Math.max(ans.length, 5);
        codeHtml += '<input class="blank" type="text" size="' + size + '" data-answer="' +
          escapeHtml(ans) + '" autocomplete="off" spellcheck="false" aria-label="填空 ' + (i + 1) + '">';
      }
    });

    /* 答案对照表：英文原文 | 中文讲解 */
    var rowsHtml = '';
    q.answer.rows.forEach(function (r) {
      rowsHtml += '<div class="compare-row">' +
        '<div class="cell en">' + escapeHtml(r.en) + '</div>' +
        '<div class="cell zh">' + escapeHtml(r.zh) + '</div></div>';
    });

    var hasBlanks = q.blanks.length > 0;

    return '' +
      '<article class="card" data-id="' + q.id + '" data-mastered="' + (mastered.indexOf(q.id) >= 0) + '">' +
        '<div class="card-head">' +
          '<span class="task-tag">Task ' + q.id + '</span>' +
          '<div class="q-text">' +
            '<p class="q-en">' + mdInline(q.qEn) + '</p>' +
            '<p class="q-zh">' + mdInline(q.qZh) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="code-block">' + codeHtml + '</div>' +
        '<div class="hints"></div>' +
        '<div class="actions">' +
          '<button class="btn-act" type="button" data-act="hint">💡 提示 (0/' + q.hints.length + ')</button>' +
          (hasBlanks ? '<button class="btn-act" type="button" data-act="check">✅ 检查</button>' : '') +
          '<button class="btn-act primary" type="button" data-act="answer">📖 显示答案</button>' +
          '<button class="btn-act star" type="button" data-act="star">' +
            (mastered.indexOf(q.id) >= 0 ? '★ 已掌握' : '☆ 标记已掌握') + '</button>' +
          '<span class="check-result"></span>' +
        '</div>' +
        '<div class="answer">' +
          '<h4>答案 Answer · 中英对照</h4>' +
          '<div class="compare">' +
            '<div class="compare-row head"><div class="cell compare-head">English 英文原文</div>' +
            '<div class="cell compare-head">中文对照讲解</div></div>' +
            rowsHtml +
          '</div>' +
          '<div class="full-answer">' +
            '<div class="label">完整原文答案 Original Answer' +
              '<button class="btn-act copy-btn" type="button" data-act="copy">📋 复制</button></div>' +
            '<div class="code-block">' + highlight(q.answer.code) + '</div>' +
          '</div>' +
          (q.answer.note ? '<div class="answer-note">💡 ' + mdInline(q.answer.note) + '</div>' : '') +
        '</div>' +
      '</article>';
  }

  function renderContent() {
    var html = '';
    SECTIONS.forEach(function (sec) {
      html += '<section id="' + sec.id + '">' +
        '<div class="section-head">' +
          '<h2>' + sec.no + '. ' + escapeHtml(sec.titleZh) +
            '<small>' + escapeHtml(sec.titleEn) + '</small></h2>' +
          '<p class="lead">' + mdInline(sec.lead) + '</p>' +
        '</div>';
      html += '<div class="cards">';
      sec.questions.forEach(function (q) { html += renderCard(sec, q); });
      html += '</div></section>';
    });
    contentEl.innerHTML = html;
  }

  /* ---------- 进度 ---------- */
  function updateProgress() {
    var pct = totalQuestions ? Math.round(mastered.length / totalQuestions * 100) : 0;
    progressFill.style.width = pct + '%';
    progressText.textContent = mastered.length + ' / ' + totalQuestions + ' 已掌握 (' + pct + '%)';
  }

  function isMastered(id) { return mastered.indexOf(id) >= 0; }

  function toggleMastered(card, id) {
    var idx = mastered.indexOf(id);
    if (idx >= 0) mastered.splice(idx, 1); else mastered.push(id);
    save(LS_MASTER, mastered);
    var btn = card.querySelector('[data-act="star"]');
    btn.textContent = isMastered(id) ? '★ 已掌握' : '☆ 标记已掌握';
    btn.classList.toggle('on', isMastered(id));
    card.dataset.mastered = isMastered(id);
    updateProgress();
    applyFilter();
  }

  /* ---------- 卡片交互 ---------- */
  function getQuestion(id) {
    for (var i = 0; i < SECTIONS.length; i++) {
      var qs = SECTIONS[i].questions;
      for (var j = 0; j < qs.length; j++) if (qs[j].id === id) return qs[j];
    }
    return null;
  }

  function showHint(card, q) {
    var level = parseInt(card.dataset.hintLevel || '0', 10);
    if (level >= q.hints.length) return;
    level += 1;
    card.dataset.hintLevel = level;
    var box = card.querySelector('.hints');
    box.innerHTML += '<div class="hint-item">提示 ' + level + '：' + mdInline(q.hints[level - 1]) + '</div>';
    card.querySelector('[data-act="hint"]').textContent =
      '💡 提示 (' + level + '/' + q.hints.length + ')';
  }

  function checkBlanks(card) {
    var inputs = card.querySelectorAll('input.blank');
    var ok = 0, total = inputs.length;
    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.remove('right', 'wrong');
        return;
      }
      var accepted = input.dataset.answer.split('|').map(normalize);
      var good = accepted.indexOf(normalize(input.value)) >= 0;
      input.classList.toggle('right', good);
      input.classList.toggle('wrong', !good);
      if (good) ok++;
    });
    var res = card.querySelector('.check-result');
    if (!total) return;
    if (ok === total) { res.textContent = '🎉 全部正确 ' + ok + '/' + total; res.className = 'check-result ok'; }
    else { res.textContent = '正确 ' + ok + '/' + total + '，继续加油'; res.className = 'check-result bad'; }
  }

  function setAnswer(card, q, show) {
    var panel = card.querySelector('.answer');
    var btn = card.querySelector('[data-act="answer"]');
    card.querySelectorAll('input.blank').forEach(function (input, i) {
      var ans = q.blanks[i] || '';
      if (show) {
        input.value = ans.split('|')[0];
        input.classList.add('right');
        input.classList.remove('wrong');
        input.dataset.autofill = '1';
      } else if (input.dataset.autofill === '1' && input.value === ans.split('|')[0]) {
        input.value = '';
        input.classList.remove('right', 'wrong');
        delete input.dataset.autofill;
      }
    });
    panel.classList.toggle('show', show);
    btn.textContent = show ? '🙈 隐藏答案' : '📖 显示答案';
    card.classList.toggle('answered', show);
    card.querySelector('.check-result').textContent = '';
  }

  /* ---------- 事件委托 ---------- */
  contentEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var card = btn.closest('.card');
    var q = getQuestion(card.dataset.id);
    switch (btn.dataset.act) {
      case 'hint': showHint(card, q); break;
      case 'check': checkBlanks(card); break;
      case 'answer': setAnswer(card, q, !card.querySelector('.answer').classList.contains('show')); break;
      case 'star': toggleMastered(card, card.dataset.id); break;
      case 'copy': copyCode(card); break;
    }
  });

  contentEl.addEventListener('input', function (e) {
    if (e.target.classList.contains('blank')) {
      e.target.classList.remove('right', 'wrong');
      if (e.target.dataset.autofill) delete e.target.dataset.autofill;
    }
  });

  function copyCode(card) {
    var q = getQuestion(card.dataset.id);
    var btn = card.querySelector('[data-act="copy"]');
    var text = q.answer.code;
    var done = function () {
      btn.textContent = '✅ 已复制';
      setTimeout(function () { btn.textContent = '📋 复制'; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  /* ---------- 搜索 / 过滤 ---------- */
  var currentFilter = 'all';

  function cardText(card) {
    if (!card.dataset.search) {
      var q = getQuestion(card.dataset.id);
      card.dataset.search = (q.qEn + ' ' + q.qZh + ' ' + q.answer.rows.map(function (r) { return r.en + ' ' + r.zh; }).join(' ') + ' ' + q.answer.note + ' ' + q.blanks.join(' ')).toLowerCase();
    }
    return card.dataset.search;
  }

  function applyFilter() {
    var kw = (searchBox.value || '').trim().toLowerCase();
    SECTIONS.forEach(function (sec) {
      var sectionEl = document.getElementById(sec.id);
      var visible = 0;
      sec.questions.forEach(function (q) {
        var card = contentEl.querySelector('.card[data-id="' + q.id + '"]');
        if (!card) return;
        var passMaster = currentFilter === 'all' ||
          (currentFilter === 'done' && isMastered(q.id)) ||
          (currentFilter === 'todo' && !isMastered(q.id));
        var passSearch = !kw || cardText(card).indexOf(kw) >= 0;
        var show = passMaster && passSearch;
        card.classList.toggle('hide', !show);
        if (show) visible++;
      });
      sectionEl.style.display = visible ? '' : 'none';
    });
    var anyVisible = contentEl.querySelectorAll('.card:not(.hide)').length;
    var empty = document.getElementById('emptyTip');
    if (!anyVisible && !empty) {
      empty = document.createElement('div');
      empty.id = 'emptyTip';
      empty.className = 'empty';
      empty.textContent = '没有匹配的题目，换个关键词试试。';
      contentEl.appendChild(empty);
    } else if (anyVisible && empty) {
      empty.remove();
    }
  }

  searchBox.addEventListener('input', applyFilter);

  document.querySelectorAll('.chip-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.chip-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  /* ---------- 全局按钮 ---------- */
  document.getElementById('showAll').addEventListener('click', function () {
    contentEl.querySelectorAll('.card').forEach(function (card) {
      setAnswer(card, getQuestion(card.dataset.id), true);
    });
  });
  document.getElementById('hideAll').addEventListener('click', function () {
    contentEl.querySelectorAll('.card').forEach(function (card) {
      setAnswer(card, getQuestion(card.dataset.id), false);
    });
  });
  document.getElementById('resetAll').addEventListener('click', function () {
    contentEl.querySelectorAll('.card').forEach(function (card) {
      card.querySelector('.hints').innerHTML = '';
      card.dataset.hintLevel = '0';
      card.querySelector('[data-act="hint"]').textContent =
        '💡 提示 (0/' + getQuestion(card.dataset.id).hints.length + ')';
      card.querySelectorAll('input.blank').forEach(function (input) {
        input.value = '';
        input.classList.remove('right', 'wrong');
        delete input.dataset.autofill;
      });
      card.querySelector('.check-result').textContent = '';
      setAnswer(card, getQuestion(card.dataset.id), false);
    });
    searchBox.value = '';
    applyFilter();
  });

  /* ---------- 主题 ---------- */
  var themeBtn = document.getElementById('themeToggle');
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'dark' ? '☀️ 日间模式' : '🌙 夜间模式';
  }
  applyTheme(load(LS_THEME, 'light'));
  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    save(LS_THEME, next);
  });

  /* ---------- 启动 ---------- */
  renderNav();
  renderContent();
  contentEl.querySelectorAll('[data-act="star"]').forEach(function (btn) {
    btn.classList.toggle('on', isMastered(btn.closest('.card').dataset.id));
  });
  updateProgress();
})();
