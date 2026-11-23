(() => {
  // Enhance visible HTML only after all page renderers have run.
  if (!window.IntersectionObserver || !window.MutationObserver) return;
  const root = document.querySelector('main');
  if (!root) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const selector = document.body.classList.contains('home-figma')
    ? '#main > section, body > .footer'
    : '.case-hero, .case-showcase, .create-cover, .case-body > .case-section, .case-full-link, .case-bottom, body > .footer';
  const states = new Map();
  const active = new Set();
  let frame = 0;
  let discover = false;
  const clamp = n => Math.max(0, Math.min(1, n));
  const distance = () => innerWidth <= 700 ? 32 : 64;

  function finish(element, initial = false) {
    const state = states.get(element);
    if (!state) return;
    state.offset = 0;
    state.done = true;
    element.style.removeProperty('--scroll-reveal-y');
    element.style.removeProperty('--scroll-reveal-opacity');
    element.classList.add('is-scroll-visible');
    if (initial) element.classList.add('is-scroll-initial');
    active.delete(element);
    observer.unobserve(element);
  }
  function register() {
    for (const [element] of states) {
      if (!element.isConnected) { observer.unobserve(element); active.delete(element); states.delete(element); }
    }
    if (preference.matches) return;
    for (const element of document.querySelectorAll(selector)) {
      if (states.has(element)) continue;
      const top = element.getBoundingClientRect().top;
      states.set(element, { offset: distance(), done: false });
      element.style.setProperty('--scroll-reveal-y', `${distance()}px`);
      element.classList.add('scroll-reveal');
      if (top < innerHeight * .85) finish(element, top >= 0);
      else observer.observe(element);
    }
  }
  function update() {
    frame = 0;
    if (document.hidden || preference.matches) return;
    if (discover) { discover = false; register(); }
    // Read all geometry before writing transforms to avoid repeated layout work.
    const measurements = [...active].map(element => [element, element.getBoundingClientRect()]);
    for (const [element, rect] of measurements) {
      const state = states.get(element);
      if (!state || state.done || !element.isConnected) continue;
      const top = rect.top - state.offset;
      const travel = Math.max(1, Math.min(innerHeight * .32, Math.max(120, rect.height * .3), rect.height - innerHeight * .02));
      const progress = clamp((innerHeight * .98 - top) / travel);
      if (progress >= 1) { finish(element); continue; }
      state.offset = distance() * (1 - progress) ** 2;
      element.style.setProperty('--scroll-reveal-y', `${state.offset.toFixed(2)}px`);
      element.style.setProperty('--scroll-reveal-opacity', progress.toFixed(3));
    }
  }
  function schedule() {
    if (!frame && !document.hidden && !preference.matches) frame = requestAnimationFrame(update);
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) active.add(entry.target);
      else active.delete(entry.target);
    }
    schedule();
  }, { rootMargin: '0px 0px 15% 0px', threshold: 0 });
  const mutations = new MutationObserver(() => { discover = true; schedule(); });
  mutations.observe(root, { childList: true, subtree: true });
  function revealTarget(target) {
    if (!target?.closest) return;
    const element = target.closest('.scroll-reveal');
    if (element) { finish(element); element.classList.remove('is-scroll-initial'); }
  }
  function revealHash() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    revealTarget(document.getElementById(id));
  }
  function configure() {
    observer.disconnect(); active.clear();
    cancelAnimationFrame(frame); frame = 0;
    for (const [element] of states) {
      element.classList.remove('scroll-reveal', 'is-scroll-visible', 'is-scroll-initial');
      element.style.removeProperty('--scroll-reveal-y');
      element.style.removeProperty('--scroll-reveal-opacity');
    }
    states.clear(); register(); revealHash(); schedule();
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pageshow', () => { discover = true; revealHash(); schedule(); });
  addEventListener('hashchange', () => { revealHash(); schedule(); });
  document.addEventListener('focusin', event => revealTarget(event.target));
  document.addEventListener('visibilitychange', schedule);
  if (preference.addEventListener) preference.addEventListener('change', configure);
  else if (preference.addListener) preference.addListener(configure);
  if (document.fonts) document.fonts.ready.then(schedule);
  configure();
})();
