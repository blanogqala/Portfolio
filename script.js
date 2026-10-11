'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; if (!project.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} projects shown.`;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('blanogqala@gmail.com'); status.textContent = 'Email address copied.'; }
  catch { status.textContent = 'Please copy the address above, or click it to open your email app.'; }
});
document.querySelector('#contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const button = form.querySelector('[type=submit]');
  const status = document.querySelector('#form-status');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  button.disabled = true; button.textContent = 'Sending…'; status.textContent = 'Sending your message…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error('Send failed');
    status.textContent = 'Thanks! Your message has been sent.'; form.reset();
  } catch { status.textContent = 'Your message could not be sent. Please try again or email blanogqala@gmail.com directly.'; }
  finally { clearTimeout(timeout); button.disabled = false; button.innerHTML = 'Send message <span>↗</span>'; }
});

// Motion never gates content, and respects both system preferences and the pause button.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
const motionButton = document.querySelector('#motion-toggle');
let userPaused = false;
try { userPaused = localStorage.getItem('portfolio-motion-paused') === 'true'; } catch { /* Storage may be disabled. */ }
function updateMotion() {
  const paused = userPaused || reducedMotion.matches;
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.disabled = reducedMotion.matches;
  motionButton.setAttribute('aria-label', reducedMotion.matches ? 'Animation disabled by system preference' : paused ? 'Enable animation' : 'Pause animation');
  motionButton.innerHTML = `Motion ${paused ? 'off' : 'on'} <span aria-hidden="true">◉</span>`;
}
motionButton.addEventListener('click', () => {
  if (reducedMotion.matches) return;
  userPaused = !userPaused;
  try { localStorage.setItem('portfolio-motion-paused', String(userPaused)); } catch { /* Optional preference. */ }
  updateMotion();
});
reducedMotion.addEventListener('change', updateMotion);
updateMotion();
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .project, .about-grid, .timeline article, .skills-grid article, .education-grid, .contact-grid').forEach(element => {
    element.classList.add('reveal-ready'); reveal.observe(element);
  });
}
for (const card of document.querySelectorAll('.project-art, .portrait-card')) {
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || document.body.classList.contains('motion-paused')) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
    card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 6}deg`);
  });
  card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
}
let scrollScheduled = false;
function updateScroll() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.reading-progress').style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  let active = '';
  for (const link of links) if (document.querySelector(link.hash)?.getBoundingClientRect().top <= 160) active = link.hash;
  links.forEach(link => { if (link.hash === active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => { if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
updateScroll();
