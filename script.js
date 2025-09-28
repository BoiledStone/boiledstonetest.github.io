// script.js - subtle mouse-follow background parallax
// Updates CSS variables --bg-pos-top and --bg-pos-bottom based on cursor position.
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced) return; // don't animate for reduced-motion users

  // Throttle updates for performance
  let rafId = null;
  let lastEvent = null;
  let scrollY = window.scrollY || 0;
  let targetScroll = scrollY;
  let smoothScroll = scrollY;

  function onMove(e){
    lastEvent = e;
    if(rafId) return;
    rafId = requestAnimationFrame(update);
  }

  function update(){
    rafId = null;
    if(!lastEvent) return;
    const e = lastEvent;
    const w = window.innerWidth;
    const h = window.innerHeight;
    // normalized -0.5 .. 0.5
    const nx = (e.clientX / w) - 0.5;
    const ny = (e.clientY / h) - 0.5;

  // read CSS multipliers (fall back to defaults)
  const css = getComputedStyle(document.documentElement);
  const mouseMult = parseFloat(css.getPropertyValue('--parallax-mouse-mult')) || 0.5;
  const scrollMult = parseFloat(css.getPropertyValue('--parallax-scroll-mult')) || 1.2;

  // mouse-based pixel offset (max 40px horizontally/20px vertically) reduced by mouseMult
  const mouseMaxX = Math.min(40, w * 0.06) * mouseMult;
  const mouseMaxY = Math.min(24, h * 0.06) * mouseMult;
    const mx = Math.round(nx * mouseMaxX);
    const my = Math.round(ny * mouseMaxY);

    // combine with current smoothScroll to compute scroll-based px offsets
    const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = (smoothScroll / docH);
  const scrollMax = Math.round(window.innerHeight * 0.12 * scrollMult); // scaled by scrollMult

  const topScroll = Math.round(-scrollMax * pct);
  const bottomScroll = Math.round(scrollMax * pct);

    // final translations in px: combine mouse and scroll
    const topTx = `${mx}px`;
    const topTy = `${topScroll + my}px`;
    const bottomTx = `${-mx}px`;
    const bottomTy = `${bottomScroll + my}px`;

  applyTransforms(mx, my);

    lastEvent = null;
  }

  // central logic to compute transforms given mouse offsets (mx,my) and current smoothScroll
  function applyTransforms(mx = 0, my = 0){
    // compute percent-based positions so backgrounds stay visible (bounded 10%..90%)
    const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = (smoothScroll / docH);

    // mouse contribution: map mx (-40..40) to -6..6 percent
    const mousePctX = Math.max(-6, Math.min(6, (mx / Math.max(1, window.innerWidth)) * 100 * 0.06));
    const mousePctY = Math.max(-4, Math.min(4, (my / Math.max(1, window.innerHeight)) * 100 * 0.04));

    // scroll contribution: top moves -12%..0, bottom moves 0..+12%
    const scrollTopPct = -12 * pct;
    const scrollBottomPct = 12 * pct;

    // base positions (percent)
    let topX = 50 + mousePctX;
    let topY = 20 + scrollTopPct + mousePctY;
  let bottomX = 50 - mousePctX;
  // invert bottom vertical movement: subtract scroll and mouse contributions
  let bottomY = 80 - scrollBottomPct - mousePctY;

    // clamp to safe range so images remain visible
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    topX = clamp(topX, 10, 90);
    topY = clamp(topY, 5, 50);
    bottomX = clamp(bottomX, 10, 90);
    bottomY = clamp(bottomY, 50, 95);

    document.documentElement.style.setProperty('--bg-top-pos', `${topX.toFixed(2)}% ${topY.toFixed(2)}%`);
    document.documentElement.style.setProperty('--bg-bottom-pos', `${bottomX.toFixed(2)}% ${bottomY.toFixed(2)}%`);

  // also position extra layers with smaller/parallax multiplier (farther layers move less)
  const mul3 = 0.5, mul4 = 0.35, mul5 = 0.2;
  const l3x = 50 + mousePctX * mul3;
  const l3y = 30 + scrollTopPct * mul3 + mousePctY * mul3;
  const l4x = 50 + mousePctX * mul4;
  const l4y = 40 + scrollTopPct * mul4 + mousePctY * mul4;
  const l5x = 50 + mousePctX * mul5;
  const l5y = 45 + scrollTopPct * mul5 + mousePctY * mul5;

  document.documentElement.style.setProperty('--bg-layer-3-pos', `${l3x.toFixed(2)}% ${l3y.toFixed(2)}%`);
  document.documentElement.style.setProperty('--bg-layer-4-pos', `${l4x.toFixed(2)}% ${l4y.toFixed(2)}%`);
  document.documentElement.style.setProperty('--bg-layer-5-pos', `${l5x.toFixed(2)}% ${l5y.toFixed(2)}%`);

  const mul6 = 0.15, mul7 = 0.1, mul8 = 0.08, mul9 = 0.05, mul10 = 0.03;
  const l6x = 50 + mousePctX * mul6;
  const l6y = 50 + scrollTopPct * mul6 + mousePctY * mul6;
  const l7x = 50 + mousePctX * mul7;
  const l7y = 55 + scrollTopPct * mul7 + mousePctY * mul7;
  const l8x = 50 + mousePctX * mul8;
  const l8y = 60 + scrollTopPct * mul8 + mousePctY * mul8;
  const l9x = 50 + mousePctX * mul9;
  const l9y = 65 + scrollTopPct * mul9 + mousePctY * mul9;
  const l10x = 50 + mousePctX * mul10;
  const l10y = 70 + scrollTopPct * mul10 + mousePctY * mul10;

  document.documentElement.style.setProperty('--bg-layer-6-pos', `${l6x.toFixed(2)}% ${l6y.toFixed(2)}%`);
  document.documentElement.style.setProperty('--bg-layer-7-pos', `${l7x.toFixed(2)}% ${l7y.toFixed(2)}%`);
  document.documentElement.style.setProperty('--bg-layer-8-pos', `${l8x.toFixed(2)}% ${l8y.toFixed(2)}%`);
  document.documentElement.style.setProperty('--bg-layer-9-pos', `${l9x.toFixed(2)}% ${l9y.toFixed(2)}%`);
  document.documentElement.style.setProperty('--bg-layer-10-pos', `${l10x.toFixed(2)}% ${l10y.toFixed(2)}%`);
  }

  // Attach listener only on pointer-capable devices
  if('onmousemove' in window){
    window.addEventListener('mousemove', onMove, {passive:true});
  }

  // Also support touch move subtly
  let touchActive = false;
  window.addEventListener('touchstart', ()=>{ touchActive = true }, {passive:true});
  window.addEventListener('touchmove', function(e){ if(e.touches && e.touches[0]) onMove(e.touches[0]); }, {passive:true});

  // Scroll handling for parallax
  function onScroll(){
    targetScroll = window.scrollY || 0;
    if(rafId) return;
    rafId = requestAnimationFrame(updateScroll);
  }

  function updateScroll(){
    rafId = null;
    // simple lerp smoothing
    smoothScroll += (targetScroll - smoothScroll) * 0.12;
    const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = (smoothScroll / docH); // 0..1

    // compute vertical parallax shift in percent: top shifts up to -12% at bottom, bottom shifts down to +12%
    const maxScrollShift = 12; // percent
    const topShift = (-maxScrollShift * pct).toFixed(2);
    const bottomShift = (100 + (maxScrollShift * pct)).toFixed(2);

  // apply transforms using current mouse offsets (if any)
  // derive some gentle mouse offsets based on current position
  const nx = (window.innerWidth/2) - (window.innerWidth/2); // zero if no mouse
  applyTransforms(0, 0);

    // continue smoothing while not yet arrived
    if(Math.abs(targetScroll - smoothScroll) > 0.5){
      rafId = requestAnimationFrame(updateScroll);
    }
  }

  window.addEventListener('scroll', onScroll, {passive:true});

  // -------------------------------------------
  // Toggle which full-viewport bg-layer is visible
  // One layer per viewport (index 0 shows layer-3, index 1 -> layer-4, ...)
  const layers = Array.from(document.querySelectorAll('.bg-layer'));
  let activeIndex = -1;

  function updateActiveLayer(){
    const idx = Math.floor((window.scrollY || 0) / window.innerHeight);
    const clampIdx = Math.max(0, Math.min(layers.length - 1, idx));
    if(clampIdx === activeIndex) return;
    activeIndex = clampIdx;
    layers.forEach((el, i) => el.classList.toggle('active', i === clampIdx));
  }

  // Initialize and keep in sync during scroll. Use rAF to avoid thrashing.
  let rafActive = null;
  function scheduleActiveUpdate(){
    if(rafActive) return;
    rafActive = requestAnimationFrame(()=>{ rafActive = null; updateActiveLayer(); });
  }
  // initial run
  updateActiveLayer();
  window.addEventListener('scroll', scheduleActiveUpdate, {passive:true});

})();
