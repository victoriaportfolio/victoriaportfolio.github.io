(() => {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const sparks = new Set();
  const colors = ['#fb5e1a', '#ffad72', '#ffe2c8'];
  let trail;
  let lastTime = 0;
  let lastX = -100;
  let lastY = -100;

  function clearTrail() {
    for (const spark of sparks) spark.remove();
    sparks.clear();
    trail?.remove();
    trail = undefined;
    lastTime = 0;
  }

  function onPointerMove(event) {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch' || event.buttons) return;
    const now = performance.now();
    if (now - lastTime < 40 || Math.hypot(event.clientX - lastX, event.clientY - lastY) < 10) return;
    lastTime = now;
    lastX = event.clientX;
    lastY = event.clientY;
    if (!trail) {
      trail = document.createElement('div');
      trail.className = 'magic-cursor-trail';
      trail.setAttribute('aria-hidden', 'true');
      document.body.append(trail);
    }
    if (sparks.size >= 14) {
      const oldest = sparks.values().next().value;
      oldest.remove();
      sparks.delete(oldest);
    }
    const spark = document.createElement('span');
    spark.className = 'magic-cursor-spark';
    spark.style.setProperty('--spark-x', `${event.clientX}px`);
    spark.style.setProperty('--spark-y', `${event.clientY}px`);
    spark.style.setProperty('--spark-dx', `${Math.random() * 24 - 12}px`);
    spark.style.setProperty('--spark-dy', `${Math.random() * 18 + 6}px`);
    spark.style.setProperty('--spark-size', `${Math.random() * 4 + 5}px`);
    spark.style.setProperty('--spark-color', colors[Math.floor(Math.random() * colors.length)]);
    sparks.add(spark);
    trail.append(spark);
    spark.addEventListener('animationend', () => { sparks.delete(spark); spark.remove(); }, { once: true });
  }

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', clearTrail);
  window.addEventListener('blur', clearTrail);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTrail(); });
  finePointer.addEventListener('change', clearTrail);
  reducedMotion.addEventListener('change', clearTrail);
})();
