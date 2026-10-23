document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle.querySelector('i');

  // Theme
  const setIcon = () => icon.className = body.classList.contains('light') ? 'fas fa-sun' : 'fas fa-moon';
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || (!saved && matchMedia('(prefers-color-scheme: light)').matches)) body.classList.add('light');
  setIcon();
  toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    setIcon();
    try { localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark'); } catch (e) {}
  });

  // Mobile menu
  const menu = document.getElementById('menu');
  document.getElementById('menu-toggle').addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = el.closest('.hero') ? `${i * 0.1}s` : '0s';
    io.observe(el);
  });

  // Active nav link
  const links = [...menu.querySelectorAll('a')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  // Typing effect
  const words = ['AI & Data Science Student', 'C Programmer', 'Web Developer', 'Future AI Builder'];
  const el = document.getElementById('typed');
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 80);
  })();
});
