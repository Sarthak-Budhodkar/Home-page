document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menu-toggle');

  initializeTheme(body, themeToggle, themeIcon);
  initializeMenu(menu, menuToggle);
  initializeRevealAnimations();
  initializeSectionNavigation(menu);
  initializeTypewriter();
});

function initializeTheme(body, toggle, icon) {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem('theme');
  } catch (error) {
    // Theme preferences are optional when storage is unavailable.
  }

  const prefersLightTheme = matchMedia('(prefers-color-scheme: light)').matches;
  if (savedTheme === 'light' || (!savedTheme && prefersLightTheme)) {
    body.classList.add('light');
  }

  updateThemeIcon(body, icon);

  toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    updateThemeIcon(body, icon);

    try {
      const theme = body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    } catch (error) {
      // Keep the theme toggle usable when storage is unavailable.
    }
  });
}

function updateThemeIcon(body, icon) {
  icon.className = body.classList.contains('light')
    ? 'fas fa-sun'
    : 'fas fa-moon';
}

function initializeMenu(menu, toggle) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

function initializeRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = element.closest('.hero')
      ? `${index * 0.1}s`
      : '0s';
    observer.observe(element);
  });
}

function initializeSectionNavigation(menu) {
  const links = [...menu.querySelectorAll('a')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      links.forEach((link) => {
        const isCurrentSection = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isCurrentSection);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => {
    observer.observe(section);
  });
}

function initializeTypewriter() {
  const phrases = [
    'AI & Data Science Student',
    'C Programmer',
    'Web Developer',
    'Future AI Builder',
  ];
  const output = document.getElementById('typed');
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  function typeNextCharacter() {
    const phrase = phrases[phraseIndex];
    output.textContent = phrase.slice(0, characterIndex);

    if (!isDeleting && characterIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeNextCharacter, 1400);
      return;
    }

    if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    characterIndex += isDeleting ? -1 : 1;
    setTimeout(typeNextCharacter, isDeleting ? 40 : 80);
  }

  typeNextCharacter();
}