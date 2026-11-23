(() => {
  if (!window.requestAnimationFrame) return;
  const tracks = [...document.querySelectorAll('.belief-marquee-track')];
  const states = tracks.map(track => ({
    track, group: track.querySelector('.belief-marquee-group'),
    width: 0, offset: 0, duration: 38
  })).filter(state => state.group);
  if (!states.length) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let previous = 0;

  function position(state) {
    const transform = `translate3d(${state.offset.toFixed(2)}px,0,0)`;
    state.track.style.transform = transform;
    state.track.style.webkitTransform = transform;
  }
  function measure() {
    for (const state of states) {
      const width = state.group.getBoundingClientRect().width;
      if (!width) continue;
      state.offset = state.width ? state.offset / state.width * width : -width;
      state.width = width;
      state.duration = parseFloat(getComputedStyle(state.track).getPropertyValue('--marquee-duration')) || 38;
      position(state);
      state.track.classList.add('is-animated');
    }
  }
  function tick(time) {
    frame = 0;
    if (document.hidden) { previous = 0; return; }
    const elapsed = previous ? Math.max(0, Math.min((time - previous) / 1000, .064)) : 0;
    previous = time;
    for (const state of states) {
      if (!state.width) continue;
      // Keep the requested marquee moving more gently when reduced motion is selected.
      const duration = state.duration * (preference.matches ? 2 : 1);
      state.offset += state.width / duration * elapsed;
      if (state.offset >= 0) state.offset = state.offset % state.width - state.width;
      position(state);
    }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (document.hidden || frame || !states.some(state => state.width)) return;
    previous = 0;
    frame = requestAnimationFrame(tick);
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; previous = 0; }
  function refresh() { measure(); start(); }
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : refresh());
  addEventListener('pagehide', stop);
  addEventListener('pageshow', refresh);
  addEventListener('resize', refresh, { passive: true });
  if (preference.addEventListener) preference.addEventListener('change', refresh);
  else if (preference.addListener) preference.addListener(refresh);
  if (document.fonts) document.fonts.ready.then(refresh);
  refresh();
})();
