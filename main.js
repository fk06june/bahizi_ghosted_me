/* ============================================================
   BAHIZI CAFÉ & RESTAURANT — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- HERO CAROUSEL ---- */
  const heroSlides  = document.getElementById('heroSlides');
  const heroDots    = document.querySelectorAll('.hero-dot');
  let currentSlide  = 0;
  let autoPlayTimer = null;

  function goToSlide(n) {
    currentSlide = n;
    heroSlides.style.transform = `translateX(-${n * 100}%)`;
    heroDots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === n);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % heroDots.length);
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  // Lancer l'autoplay
  startAutoPlay();

  // Pause autoplay au survol du hero
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopAutoPlay);
    hero.addEventListener('mouseleave', startAutoPlay);
  }

  // Navigation clavier (accessibilité)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { stopAutoPlay(); goToSlide((currentSlide - 1 + heroDots.length) % heroDots.length); startAutoPlay(); }
    if (e.key === 'ArrowRight') { stopAutoPlay(); nextSlide(); startAutoPlay(); }
  });

  /* ---- NAV HAMBURGER / DRAWER ---- */
  const hamburger  = document.getElementById('navHamburger');
  const drawer     = document.getElementById('navDrawer');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Fermer en cliquant en dehors du menu
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });
  }

  // Fermer au clic sur un lien du drawer
  const drawerLinks = document.querySelectorAll('.nav-drawer-links a');
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ---- SMOOTH REVEAL AU SCROLL ---- */
  const revealEls = document.querySelectorAll(
    '.product-card, .menu-cat, .loyalty-feat, .transport-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      observer.observe(el);
    });
  }

  /* ---- NEWSLETTER FORM ---- */
  const emailForm = document.getElementById('newsletterForm');
  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = emailForm.querySelector('input[type="email"]');
      const btn   = emailForm.querySelector('button');
      if (input && input.value) {
        btn.textContent = 'Abonné !';
        btn.style.background = '#2E7D32';
        input.value = '';
        setTimeout(function () {
          btn.textContent = "S'abonner";
          btn.style.background = '';
        }, 3000);
      }
    });
  }

});
