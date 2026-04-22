/* JITA — Pure JS shared logic
   - i18n (ES/EN) persisted in localStorage
   - Renders shared Navbar + Footer
   - Mobile menu, modal, toast, scroll reveal, carousel, mission filter
*/
(function () {
  'use strict';

  // ---------- i18n ----------
  const STORAGE_KEY = 'jita.lang';
  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  }
  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    document.documentElement.lang = lang;
    document.querySelectorAll('select.lang-select').forEach(s => s.value = lang);
    // Re-render dynamic blocks that depend on language
    document.dispatchEvent(new CustomEvent('jita:lang-changed', { detail: { lang } }));
  }
  function t(key) {
    const lang = getLang();
    const dict = window.JITA_TRANSLATIONS[lang] || {};
    return dict[key] || key;
  }
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });
  }
  window.JITA = { t, getLang, setLang, applyTranslations };

  // ---------- SVG icons (lucide-style) ----------
  const ICONS = {
    menu: '<svg class="icon" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    x: '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    globe: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    arrowRight: '<svg class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowLeft: '<svg class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    heart: '<svg class="icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    users: '<svg class="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    play: '<svg class="icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    mapPin: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    calendar: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    target: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    award: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    mail: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    facebook: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    whatsapp: '<svg class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05 1.9z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>',
    instagram: '<svg class="icon" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    youtube: '<svg class="icon" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>',
    sparkles: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/></svg>',
    cart: '<svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
    chevronLeft: '<svg class="icon" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg class="icon" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',
  };
  window.JITA.icon = (name) => ICONS[name] || '';

  // ---------- Navbar / Footer ----------
  const NAV_ITEMS = [
    { key: 'nav.home', href: 'index.html', match: ['index.html', ''] },
    { key: 'nav.about', href: 'quienes-somos.html', match: ['quienes-somos.html'] },
    { key: 'nav.team', href: 'equipo.html', match: ['equipo.html'] },
    { key: 'nav.missions', href: 'misiones.html', match: ['misiones.html', 'mision-detalle.html'] },
    { key: 'nav.store', href: 'tienda.html', match: ['tienda.html'] },
  ];

  function currentPage() {
    const p = location.pathname.split('/').pop() || 'index.html';
    return p;
  }

  function renderNavbar() {
    const host = document.getElementById('jita-navbar');
    if (!host) return;
    const here = currentPage();
    const linksHTML = NAV_ITEMS.map(item => {
      const active = item.match.includes(here);
      const cls = active
        ? 'background:hsl(var(--primary));color:hsl(var(--primary-foreground));'
        : 'color:hsl(var(--muted-foreground));';
      return `<a href="${item.href}" data-i18n="${item.key}" class="nav-link"
        style="padding:.5rem .75rem;border-radius:6px;font-size:.875rem;font-weight:500;text-decoration:none;transition:background-color .2s,color .2s;${cls}"></a>`;
    }).join('');

    const mobileLinks = NAV_ITEMS.map(item => {
      const active = item.match.includes(here);
      const cls = active
        ? 'background:hsl(var(--primary));color:hsl(var(--primary-foreground));'
        : 'color:hsl(var(--muted-foreground));';
      return `<a href="${item.href}" data-i18n="${item.key}"
        style="display:block;padding:.6rem .75rem;border-radius:6px;font-size:1rem;font-weight:500;text-decoration:none;${cls}"></a>`;
    }).join('');

    host.innerHTML = `
      <nav style="background:hsl(var(--background));border-bottom:1px solid hsl(var(--border));position:sticky;top:0;z-index:50;">
        <div style="max-width:80rem;margin:0 auto;padding:0 1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;height:4rem;">
            <a href="index.html" style="display:flex;align-items:center;gap:.5rem;text-decoration:none;color:inherit;">
              <img src="/assets/images/logo/logo.png" alt="JITA Logo" style="height:2.5rem;width:2.5rem;" />
              <span style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;">Jesus Is The Answer</span>
            </a>
            <div class="desktop-nav" style="display:none;align-items:center;gap:1rem;">
              <div style="display:flex;align-items:baseline;gap:.5rem;">${linksHTML}</div>
              <div style="display:flex;align-items:center;gap:.4rem;color:hsl(var(--muted-foreground));font-size:.85rem;">
                ${ICONS.globe}
                <select class="select lang-select" style="width:5rem;height:2rem;padding:0 .35rem;font-size:.75rem;">
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                </select>
              </div>
            </div>
            <button class="btn btn-ghost mobile-toggle" aria-label="Menu" style="padding:.4rem;">
              ${ICONS.menu}
            </button>
          </div>
        </div>
        <div class="mobile-menu" style="border-top:1px solid hsl(var(--border));padding:.5rem 1rem 1rem;">
          ${mobileLinks}
          <div style="display:flex;align-items:center;gap:.4rem;padding:.6rem .75rem;color:hsl(var(--muted-foreground));">
            ${ICONS.globe}
            <select class="select lang-select" style="width:5rem;height:2rem;font-size:.75rem;">
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </nav>
    `;

    // Responsive desktop nav (CSS-in-JS via media)
    const mq = window.matchMedia('(min-width: 768px)');
    const updateMQ = () => {
      const dn = host.querySelector('.desktop-nav');
      const mt = host.querySelector('.mobile-toggle');
      if (mq.matches) { dn.style.display = 'flex'; mt.style.display = 'none'; }
      else { dn.style.display = 'none'; mt.style.display = 'inline-flex'; }
    };
    updateMQ(); mq.addEventListener('change', updateMQ);

    // Mobile toggle
    const toggle = host.querySelector('.mobile-toggle');
    const mobile = host.querySelector('.mobile-menu');
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('is-open');
      toggle.innerHTML = mobile.classList.contains('is-open') ? ICONS.x : ICONS.menu;
    });

    // Hover effects on nav links via JS (since no Tailwind)
    host.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('mouseenter', e => {
        if (!a.style.background.includes('var(--primary)')) {
          a.style.background = 'hsl(var(--muted))';
          a.style.color = 'hsl(var(--foreground))';
        }
      });
      a.addEventListener('mouseleave', e => {
        const here2 = currentPage();
        const it = NAV_ITEMS.find(x => x.href === a.getAttribute('href'));
        if (it && !it.match.includes(here2)) {
          a.style.background = 'transparent';
          a.style.color = 'hsl(var(--muted-foreground))';
        }
      });
    });

    // Language select binding
    host.querySelectorAll('.lang-select').forEach(sel => {
      sel.value = getLang();
      sel.addEventListener('change', e => setLang(e.target.value));
    });
  }

  function renderFooter() {
    const host = document.getElementById('jita-footer');
    if (!host) return;
    host.innerHTML = `
      <footer style="background:hsl(var(--muted) / .5);border-top:1px solid hsl(var(--border));margin-top:auto;">
        <div style="max-width:80rem;margin:0 auto;padding:3rem 1rem;">
          <div class="footer-grid" style="display:grid;grid-template-columns:1fr;gap:2rem;">
            <div>
              <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
                <img src="/assets/images/logo/logo.png" alt="JITA Logo" style="height:2.5rem;width:2.5rem;" />
                <span style="font-family:'Playfair Display',serif;font-weight:700;font-size:.95rem;">
                  Jesus Is The Answer <span style="color:hsl(var(--muted-foreground));font-weight:400;letter-spacing:.08em;">LLC</span>
                </span>
              </div>
              <p data-i18n="footer.description" style="font-size:.875rem;color:hsl(var(--muted-foreground));"></p>
            </div>
            <div>
              <h3 data-i18n="footer.navigation" style="font-weight:600;margin:0 0 1rem;font-family:Inter,sans-serif;font-size:1rem;"></h3>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;">
                <li><a href="index.html" data-i18n="nav.home" class="story-link" style="color:hsl(var(--muted-foreground));font-size:.875rem;text-decoration:none;"></a></li>
                <li><a href="quienes-somos.html" data-i18n="nav.about" class="story-link" style="color:hsl(var(--muted-foreground));font-size:.875rem;text-decoration:none;"></a></li>
                <li><a href="equipo.html" data-i18n="nav.team" class="story-link" style="color:hsl(var(--muted-foreground));font-size:.875rem;text-decoration:none;"></a></li>
                <li><a href="misiones.html" data-i18n="nav.missions" class="story-link" style="color:hsl(var(--muted-foreground));font-size:.875rem;text-decoration:none;"></a></li>
                <li><a href="tienda.html" data-i18n="nav.store" class="story-link" style="color:hsl(var(--muted-foreground));font-size:.875rem;text-decoration:none;"></a></li>
              </ul>
            </div>
            <div>
              <h3 data-i18n="footer.contact" style="font-weight:600;margin:0 0 1rem;font-family:Inter,sans-serif;font-size:1rem;"></h3>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;">
                <li style="display:flex;align-items:center;gap:.5rem;color:hsl(var(--muted-foreground));font-size:.875rem;">
                  ${ICONS.mail} <span>jesusintheanswer33.3@gmail.com</span>
                </li>
                <li style="display:flex;align-items:center;gap:.5rem;color:hsl(var(--muted-foreground));font-size:.875rem;">
                  ${ICONS.whatsapp} <span><a href="https://wa.me/+51916785428" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">WhatsApp: +51 916 785 428</a></span>
                </li>
              </ul>
              <div style="margin-top:1rem;">
                <h4 data-i18n="footer.followUs" style="font-weight:600;font-size:.875rem;margin:0 0 .5rem;font-family:Inter,sans-serif;"></h4>
                <div style="display:flex;gap:.75rem;">
                  <a href="https://www.facebook.com/people/JITA-Ministries/100088280528626/" target="_blank" rel="noopener" style="color:hsl(var(--muted-foreground));font-size:1.25rem;line-height:1;">${ICONS.facebook}</a>
                  <a href="https://www.instagram.com/monica.r.eslava" target="_blank" rel="noopener" style="color:hsl(var(--muted-foreground));font-size:1.25rem;line-height:1;">${ICONS.instagram}</a>
                  <a href="https://www.youtube.com/@monicaeslava8191" target="_blank" rel="noopener" style="color:hsl(var(--muted-foreground));font-size:1.25rem;line-height:1;">${ICONS.youtube}</a>
                </div>
              </div>
            </div>
            <div>
              <h3 data-i18n="footer.ourMission" style="font-weight:600;margin:0 0 1rem;font-family:Inter,sans-serif;font-size:1rem;"></h3>
              <p data-i18n="footer.missionText" style="font-size:.875rem;color:hsl(var(--muted-foreground));"></p>
            </div>
          </div>
          <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid hsl(var(--border));display:flex;flex-direction:column;gap:.5rem;align-items:center;justify-content:space-between;text-align:center;">
            <p data-i18n="footer.rights" style="color:hsl(var(--muted-foreground));font-size:.875rem;margin:0;"></p>
            <p style="color:hsl(var(--muted-foreground));font-size:.875rem;margin:0;display:inline-flex;align-items:center;gap:.25rem;">
              <span data-i18n="footer.madeWith"></span>
              <span style="color:hsl(var(--primary));font-size:1rem;line-height:0;">${ICONS.heart}</span>
              <span data-i18n="footer.forGlory"></span>
            </p>
          </div>
        </div>
      </footer>
    `;
    // Responsive 4-col footer
    const mq = window.matchMedia('(min-width: 768px)');
    const grid = host.querySelector('.footer-grid');
    const updateMQ = () => {
      grid.style.gridTemplateColumns = mq.matches ? 'repeat(4, 1fr)' : '1fr';
    };
    updateMQ(); mq.addEventListener('change', updateMQ);
  }

  // ---------- Toast ----------
  function ensureToastRegion() {
    let r = document.getElementById('toast-region');
    if (!r) { r = document.createElement('div'); r.id = 'toast-region'; document.body.appendChild(r); }
    return r;
  }
  window.JITA.toast = function (title, desc) {
    const r = ensureToastRegion();
    const node = document.createElement('div');
    node.className = 'toast';
    node.innerHTML = `<strong>${title}</strong><small>${desc || ''}</small>`;
    r.appendChild(node);
    setTimeout(() => { node.style.transition = 'opacity .3s'; node.style.opacity = '0'; }, 3500);
    setTimeout(() => node.remove(), 4000);
  };

  // ---------- Modal ----------
  window.JITA.modal = function (innerHTML) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal-content" style="position:relative;">
      <button class="modal-close" aria-label="Close">${ICONS.x}</button>
      ${innerHTML}
    </div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    const close = () => { overlay.remove(); document.body.style.overflow = ''; };
    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function esc(ev) {
      if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
    return { close, root: overlay };
  };

  // ---------- Scroll reveal ----------
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  // ---------- Carousel (lightweight) ----------
  window.JITA.carousel = function (root) {
    const viewport = root.querySelector('.carousel-viewport');
    const track = root.querySelector('.carousel-track');
    const prev = root.querySelector('.carousel-btn-prev');
    const next = root.querySelector('.carousel-btn-next');
    let index = 0;
    let autoplayTimer = null;
    let isPaused = false;

    function visibleCount() {
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    }
    function maxIndex() {
      return Math.max(0, track.children.length - visibleCount());
    }
    function update() {
      const slideW = viewport.clientWidth / visibleCount();
      track.style.transform = `translateX(-${index * slideW}px)`;
    }
    function go(dir) {
      const m = maxIndex();
      if (m <= 0) return;
      index += dir;
      if (index < 0) index = m;     // loop to end
      if (index > m) index = 0;     // loop to start
      update();
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        if (!isPaused) go(1);
      }, 5000);
    }
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    prev && prev.addEventListener('click', () => { go(-1); startAutoplay(); });
    next && next.addEventListener('click', () => { go(1); startAutoplay(); });
    window.addEventListener('resize', update);
    
    // Iniciar
    update();
    startAutoplay();

    // Pausar en hover (Desktop)
    root.addEventListener('mouseenter', () => { isPaused = true; });
    root.addEventListener('mouseleave', () => { isPaused = false; });

    // Touch swipe y pause (Mobile)
    let startX = 0, dx = 0;
    viewport.addEventListener('touchstart', e => { 
      isPaused = true; 
      startX = e.touches[0].clientX; 
      dx = 0; 
    }, { passive: true });
    viewport.addEventListener('touchmove', e => { 
      dx = e.touches[0].clientX - startX; 
    }, { passive: true });
    viewport.addEventListener('touchend', () => { 
      isPaused = false; 
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); 
      startAutoplay();
    });
  };

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = getLang();
    renderNavbar();
    renderFooter();
    applyTranslations();
    initReveal();
  });
})();
