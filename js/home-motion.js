(() => {
  const root = document.querySelector('.home-figma');
  if (!root) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [...root.querySelectorAll('[data-scroll-reveal]')];
  const active = new Set();
  let observer;
  let frame = 0;
  const clamp = value => Math.min(1, Math.max(0, value));
  function update() {
    frame = 0;
    if (preference.matches || document.hidden) return;
    const viewport = innerHeight;
    for (const section of active) {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(150, Math.min(rect.height * .35, viewport * .4));
      const progress = clamp((viewport * .98 - rect.top) / travel);
      section.style.setProperty('--reveal-progress', progress.toFixed(3));
      if (progress >= 1) {
        section.classList.add('is-revealed');
        active.delete(section);
        observer.unobserve(section);
      }
    }
  }
  function schedule() {
    if (!frame && !preference.matches) frame = requestAnimationFrame(update);
  }
  function configure() {
    if (observer) observer.disconnect();
    active.clear();
    cancelAnimationFrame(frame);
    frame = 0;
    const enabled = !preference.matches && 'IntersectionObserver' in window;
    root.classList.toggle('motion-ready', enabled);
    if (!enabled) {
      sections.forEach(section => section.classList.add('is-revealed'));
      return;
    }
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.add(entry.target);
        else active.delete(entry.target);
      }
      schedule();
    }, { rootMargin: '0px 0px 12% 0px', threshold: 0 });
    sections.filter(section => !section.classList.contains('is-revealed')).forEach(section => observer.observe(section));
    schedule();
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  preference.addEventListener('change', configure);
  configure();
})();
