
/* ==========================================================================
   MUHAMMED AMIN PORTFOLIO - MAIN JAVASCRIPT (js/main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. DARK / LIGHT THEME SWITCHER (Persisted in localStorage)
     ------------------------------------------------------------------------ */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  const savedTheme = localStorage.getItem('ma_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('ma_portfolio_theme', nextTheme);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon && themeLabel) {
      if (theme === 'light') {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = 'Light';
      } else {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = 'Dark';
      }
    }
  }

  /* ------------------------------------------------------------------------
     2. STICKY NAVBAR & MOBILE HAMBURGER MENU
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. ACTIVE NAVIGATION INDICATOR ON SCROLL
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-list a[href="#${id}"]`);

      if (matchingLink) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  /* ------------------------------------------------------------------------
     4. INTERSECTION OBSERVER (Scroll Reveal & Skill Progress Bars)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');
  const progressFills = document.querySelectorAll('.progress-fill');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Animate any skill bars inside this revealed element
          const bars = entry.target.querySelectorAll('.progress-fill');
          bars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
          });

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // Fallback for skill bars
  progressFills.forEach(bar => {
    if (bar.closest('.reveal.active')) {
      bar.style.width = bar.getAttribute('data-width');
    }
  });

  /* ------------------------------------------------------------------------
     5. PROJECT FILTERING (All | AI/ML | Web | Python | Other)
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. CONTACT FORM VALIDATION & INTERACTIVE FEEDBACK
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Please fill in all fields before sending.';
        return;
      }

      formStatus.style.color = '#10b981';
      formStatus.textContent = `Thank you, ${name}! Your message is ready. (Connect Formspree or EmailJS in main.js for live email delivery).`;
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     7. LIGHTWEIGHT NEURAL NETWORK PARTICLE BACKGROUND CANVAS
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = window.innerWidth < 768 ? 28 : 55;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1
      });
    }

    function drawNetwork() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 184, 166, 0.65)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.18 - dist / 900})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawNetwork);
    }

    drawNetwork();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }
});
