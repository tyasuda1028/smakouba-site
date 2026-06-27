// モバイルナビの開閉
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  // ナビ内リンクをタップしたら閉じる
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  // 画面を広げたら開閉状態をリセット
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) setOpen(false);
  });
})();

// フッターの年号を自動更新
(function () {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// スクロールで控えめにフェードアップ表示（JS有効時のみ・reduced-motion配慮）
(function () {
  document.documentElement.classList.add('js');
  var targets = document.querySelectorAll(
    '.section-head, .product-card, .why-item, .pain-card, .price-app, .founder-box, .cta-box'
  );
  if (!targets.length) return;
  targets.forEach(function (el) { el.classList.add('reveal'); });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  targets.forEach(function (el) { io.observe(el); });
})();
