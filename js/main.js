/* ============================================================
   GIUMS — comportamento do site
   ============================================================ */
(() => {
  document.documentElement.classList.add('js');

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ok */ } }
  };

  let currency = 'usd';
  let filter = 'all';
  const revealed = new Set(); // peças 18+ já reveladas nesta visita

  /* ---------- links centralizados em SITE.links ---------- */
  $$('[data-link]').forEach(a => { a.href = SITE.links[a.dataset.link] || '#'; });
  if (SITE.email) {
    $('#emailRow').hidden = false;
    $('#emailLink').href = 'mailto:' + SITE.email;
    $('#emailText').textContent = SITE.email;
  }
  $('#year').textContent = new Date().getFullYear();

  /* ---------- galeria ---------- */
  const gallery = $('#gallery');
  const lb = $('#lightbox');

  function artEl(w) {
    const wrap = document.createElement('div');
    wrap.className = `ph tone-${w.tone}`;
    wrap.style.setProperty('--r', w.ratio);
    if (w.src) {
      const img = new Image();
      img.src = w.src; img.alt = w.title[LANG]; img.loading = 'lazy';
      wrap.append(img);
    } else {
      wrap.innerHTML = `<span class="ph__label">${w.title[LANG]}<br><small>${t('img.soon')}</small></span>`;
    }
    return wrap;
  }

  function renderGallery() {
    gallery.innerHTML = '';
    WORKS.forEach(w => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'work';
      b.dataset.cats = w.cat.join(' ');
      b.dataset.id = w.id;
      b.setAttribute('aria-label', w.title[LANG]);
      b.append(artEl(w));

      const cap = document.createElement('span');
      cap.className = 'work__cap';
      cap.textContent = w.title[LANG];
      b.append(cap);

      if (w.nsfw && !revealed.has(w.id)) {
        b.classList.add('is-gated');
        b.insertAdjacentHTML('beforeend', `<span class="work__gate"><b>${t('adult.title')}</b>${t('nsfw')}<small>${t('adult.hint')}</small></span>`);
      }
      b.addEventListener('click', () => onWork(w, b));
      gallery.append(b);
    });
    applyFilter();
  }

  function openLightbox(w) {
    $('#lbStage').replaceChildren(artEl(w));
    $('#lbTitle').textContent = w.title[LANG];
    lb.showModal();
  }

  function onWork(w, el) {
    if (el.classList.contains('is-gated')) {
      revealed.add(w.id);
      el.classList.remove('is-gated');
      $('.work__gate', el)?.remove();
      return;
    }
    openLightbox(w);
  }

  /* faixa de artes: o conjunto se repete até cobrir a tela, em duas metades
     iguais, para o loop (translateX -50%) não ter emenda nem vazio */
  function renderStrip() {
    const track = $('#strip');
    const items = WORKS.filter(w => w.featured && !w.nsfw);
    const build = (copies) => {
      track.innerHTML = '';
      for (let c = 0; c < copies; c++) items.forEach(w => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'strip__item';
        b.setAttribute('aria-label', w.title[LANG]);
        if (c > 0) { b.setAttribute('aria-hidden', 'true'); b.tabIndex = -1; }
        b.append(artEl(w));
        b.addEventListener('click', () => { $('.strip').classList.add('is-paused'); openLightbox(w); });
        track.append(b);
      });
    };
    build(1);
    const setW = track.scrollWidth || 1;
    const perHalf = Math.max(1, Math.ceil(innerWidth * 1.1 / setW));
    build(perHalf * 2);
    track.style.animationDuration = Math.round(setW * perHalf / 40) + 's'; // ~40 px/s
  }

  let stripW = innerWidth;
  addEventListener('resize', () => {
    clearTimeout(renderStrip.t);
    renderStrip.t = setTimeout(() => {
      if (Math.abs(innerWidth - stripW) > 80) { stripW = innerWidth; renderStrip(); }
    }, 250);
  });

  function applyFilter() {
    $$('.work', gallery).forEach(el => {
      const cats = el.dataset.cats.split(' ');
      // 18+ só aparece quando o filtro 18+ está ativo
      const show = filter === 'all' ? !cats.includes('nsfw') : cats.includes(filter);
      el.classList.toggle('is-hidden', !show);
    });
  }

  $('#filters').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    filter = chip.dataset.filter;
    $$('.chip').forEach(c => c.classList.toggle('is-on', c === chip));
    applyFilter();
  });

  lb.addEventListener('close', () => $('.strip').classList.remove('is-paused'));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox__close')) lb.close(); });

  /* ---------- comissões ---------- */
  const money = usd => currency === 'usd'
    ? '$' + usd
    : 'R$ ' + Math.round(usd * SITE.usdToBrl).toLocaleString('pt-BR');

  function renderStatus() {
    const el = $('#status');
    el.classList.toggle('is-open', SITE.commissionsOpen);
    el.innerHTML = `<i></i>${t(SITE.commissionsOpen ? 'status.open' : 'status.closed')} <span>— ${t('status.hint')}</span>`;
    const rateDate = new Date(SITE.rateDate + 'T12:00:00').toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US', LANG === 'pt' ? { day: '2-digit', month: '2-digit', year: 'numeric' } : { day: 'numeric', month: 'short', year: 'numeric' });
    $('#priceNote').textContent = t('price.note', { date: SITE.priceSheetUpdated, rate: LANG === 'pt' ? SITE.usdToBrl.toFixed(2).replace('.', ',') : SITE.usdToBrl.toFixed(2), rateDate });
  }

  function renderCommissions() {
    const i = LANG === 'pt' ? 1 : 0;
    $('#services').innerHTML = SERVICES.map(s => `
      <article class="service reveal is-in">
        <h3>${s.name[LANG]}</h3>
        <p class="service__note">${s.note[LANG]}</p>
        <ul>${s.rows.map(r => `<li><span>${r[i]}</span><b>${money(r[2])}</b></li>`).join('')}</ul>
        <p class="service__nsfw">${t('nsfw')} ${s.nsfw}</p>
      </article>`).join('');

    $('#addons').innerHTML = ADDONS.map(a =>
      `<li><span>${a[LANG]}</span><b>${a.usd ? '+' + money(a.usd) : a.val}</b></li>`).join('');
  }

  $$('.seg button').forEach(b => b.addEventListener('click', () => {
    currency = b.dataset.cur;
    $$('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderCommissions();
  }));

  /* ---------- idioma ---------- */
  function setLang(l) {
    LANG = l;
    store.set('giums-lang', l);
    applyI18n();
    renderGallery();
    renderStrip();
    renderStatus();
    renderCommissions();
    observeReveals();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------- navegação ---------- */
  const nav = $('#nav'), burger = $('#burger');
  const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.nav__links a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  /* ---------- revelar ao rolar ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }), { threshold: .12, rootMargin: '0px 0px -40px 0px' })
    : null;
  function observeReveals() {
    $$('.reveal:not(.is-in)').forEach(el => io ? io.observe(el) : el.classList.add('is-in'));
  }

  /* ---------- brasas no hero ----------
     Leve de propósito: brilho pré-renderizado (sprite) em vez de shadowBlur,
     resolução 1x (são pontos suaves, retina não faz diferença) e poucas partículas. */
  function embers() {
    const c = $('#embers');
    if (!c || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = c.getContext('2d');
    let w, h, parts = [], raf = 0, visible = true;

    const sprite = (rgb) => {
      const s = document.createElement('canvas');
      s.width = s.height = 32;
      const g = s.getContext('2d'), grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, `rgba(${rgb}, 1)`);
      grad.addColorStop(.3, `rgba(${rgb}, .5)`);
      grad.addColorStop(1, `rgba(${rgb}, 0)`);
      g.fillStyle = grad; g.fillRect(0, 0, 32, 32);
      return s;
    };
    const sprites = [sprite('255, 120, 30'), sprite('255, 196, 70')]; // brasa e fagulha dourada

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      size: Math.random() * 9 + 5,
      vy: Math.random() * .6 + .25,
      sway: Math.random() * 2 * Math.PI,
      sp: Math.random() * .02 + .005,
      img: sprites[Math.random() < .25 ? 1 : 0],
      life: Math.random() * .5 + .5
    });
    function resize() {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w; c.height = h;
      const n = Math.round(Math.min(60, w / 18));
      parts = Array.from({ length: n }, () => spawn(true));
    }
    function frame() {
      raf = 0;
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of parts) {
        p.y -= p.vy; p.sway += p.sp; p.x += Math.sin(p.sway) * .35;
        if (p.y < -10) Object.assign(p, spawn(false));
        ctx.globalAlpha = Math.max(0, Math.min(1, (h - p.y) / h * 1.4)) * p.life;
        ctx.drawImage(p.img, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      raf = requestAnimationFrame(frame);
    }
    resize();
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
    // o navegador pode entregar várias entradas de uma vez: vale a última (a mais recente)
    new IntersectionObserver(entries => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }).observe(c);
    raf = requestAnimationFrame(frame);
  }

  /* ---------- início ---------- */
  const saved = store.get('giums-lang');
  const guess = saved || ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
  setLang(guess === 'pt' ? 'pt' : 'en');
  embers();
})();
