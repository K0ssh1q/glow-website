(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('.intro, .features, .status, .community, .support');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= window.innerHeight) return;
    section.classList.add('reveal-pending');
    observer.observe(section);
  });
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    sections.forEach(section => section.classList.remove('reveal-pending'));
  });
})();
