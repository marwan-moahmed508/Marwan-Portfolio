/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNav();
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// Close nav when a link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ── Active nav link on scroll ── */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ── Intersection Observer for animations ── */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .cert-card'
).forEach(el => observer.observe(el));

/* ── Contact form (demo) ── */
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message ✈';
      btn.disabled = false;
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 4000);
    }, 1200);
  });
}

/* ── Smooth cursor glow on hero (optional subtle effect) ── */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--mx', `${x}%`);
    hero.style.setProperty('--my', `${y}%`);
  });
}

/* ── Typing effect for hero title ── */
(function () {
  const roles = [
    'Data Pipelines',
    'ETL Systems',
    'AI Solutions',
    'Streaming Data',
  ];
  const target = document.querySelector('.hero-title .gradient-text');
  if (!target) return;

  let roleIndex = 0;
  let charIndex  = 0;
  let deleting   = false;

  function type() {
    const word = roles[roleIndex];
    if (!deleting) {
      target.textContent = word.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      target.textContent = word.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }

  setTimeout(type, 800);
})();

/* ── AI Visual live counter animation ── */
(function () {
  const el = document.querySelector('.ai-val:last-child');
  if (!el) return;
  setInterval(() => {
    const val = (2.0 + Math.random() * 0.8).toFixed(1);
    el.textContent = `${val}k`;
  }, 2000);
})();
