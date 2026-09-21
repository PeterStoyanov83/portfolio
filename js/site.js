// Header rule on scroll, and draw-on for the two diagrams.
// Everything is visible without this file; it only adds motion.
(() => {
  const top = document.querySelector('.top');
  const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const figs = [...document.querySelectorAll('.object-diagram')];
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('drawn');
      io.unobserve(e.target);
    }
  }, { threshold: 0.35 });

  for (const f of figs) {
    // Only animate diagrams that start below the fold.
    if (f.getBoundingClientRect().top > innerHeight) {
      f.classList.add('will-draw');
      io.observe(f);
    }
  }
})();
