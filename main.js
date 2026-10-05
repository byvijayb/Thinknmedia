// Thinkn Media — shared behaviour (nav, reveal, sticky CTA, tabs, year)
(function () {
  // Mobile nav
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Sticky mobile CTA: show after hero, hide near the footer
  var sticky = document.querySelector('.sticky-cta');
  var footer = document.querySelector('.footer');
  if (sticky) {
    var onScroll = function () {
      var past = window.scrollY > 520;
      var nearEnd = footer && footer.getBoundingClientRect().top < window.innerHeight;
      sticky.classList.toggle('show', past && !nearEnd);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Tabs (about page)
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('[role="tab"]');
    var panels = group.querySelectorAll('[role="tabpanel"]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        panels.forEach(function (p) { p.hidden = p.id !== btn.getAttribute('aria-controls'); });
      });
    });
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Hide images that fail to load (e.g. a missing screenshot) instead of showing a broken icon
  document.querySelectorAll('img[data-optional]').forEach(function (img) {
    img.addEventListener('error', function () {
      var box = img.closest('[data-optional-box]') || img;
      box.style.display = 'none';
    });
  });
})();
