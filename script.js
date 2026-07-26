/* ============================================
   CONFIGURATION
   Edit this section to customize the website
   ============================================ */
const CONFIG = {
  // Love counter start date (YYYY-MM-DDTHH:MM:SS)
  loveStartDate: '2026-06-03T02:35:18',

  // Funny texts for when No button is clicked/hovered
  funnyTexts: [
    'Are you sure? 🥺',
    'Think again 😭',
    'Please don\'t do this 😭',
    'You can\'t escape 😂',
    'I know you want to press Yes ❤️',
    'Nice try 😏',
    'Still trying? 😂'
  ],

  // Slideshow timing (ms)
  sectionPause: 4000,

  // Typewriter speed (ms per character)
  typewriterSpeed: 60,

  // Typewriter text for section 3
  typewriterText: 'You made my ordinary days feel special.',

  // Love letter content
  loveLetter: `প্রিয় লক্ষী, তুমি আমার জীবনে আসার পর থেকে সবকিছু যেন একটু বেশি সুন্দর হয়ে গেছে। সাধারণ দিনগুলোও এখন তোমার হাসি, তোমার কথা আর তোমার অপেক্ষায় ভরে থাকে। তুমি শুধু আমার জীবনের একটা অংশ নও, তুমি আমার শান্তির জায়গা। তোমাকে যেমন, ঠিক তেমনভাবেই ভালো লাগে। ধন্যবাদ, আমার জীবনে আসার জন্য। যদি কোনোদিন তোমার হাসির একটা ছোট্ট কারণ হতে পারি, সেটাই হবে আমার সবচেয়ে বড় প্রাপ্তি। "হয়তো তোমাকে ভালোবাসার কোনো নির্দিষ্ট কারণ নেই... কারণ সত্যিটা হলো, আমি ভালোবাসি তোমার সবকিছু।" 🌸`,

  // Timeline items
  timelineItems: [
    { icon: '❤️', text: 'The day we met', date: '8 March 2026' },
    { icon: '💬', text: 'Our first conversation', date: '3 June 2026' },
    { icon: '✨', text: 'The day I realized I like you', date: '8 June 2026' },
    { icon: '🥰', text: 'The day you made me the happiest', date: '14 July 2026' }
  ],

  // Reason cards
  reasons: [
    { emoji: '😊', text: 'Your smile' },
    { emoji: '👀', text: 'Your eyes' },
    { emoji: '🤍', text: 'Your kindness' },
    { emoji: '😂', text: 'Your laugh' },
    { emoji: '❤️', text: 'Everything about you' }
  ]
};

/* ============================================
   STATE
   ============================================ */
const state = {
  noAttempts: 0,
  maxAttempts: 10,
  slideshowActive: false,
  slideshowTimer: null
};

/* ============================================
   DOM REFERENCES
   ============================================ */
const els = {
  loadingScreen: document.getElementById('loading-screen'),
  landingScreen: document.getElementById('landing-screen'),
  buttonContainer: document.getElementById('button-container'),
  btnYes: document.getElementById('btn-yes'),
  btnNo: document.getElementById('btn-no'),
  celebrationOverlay: document.getElementById('celebration-overlay'),
  confettiCanvas: document.getElementById('confetti-canvas'),
  mainContent: document.getElementById('main-content'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxClose: document.getElementById('lightbox-close'),
  typewriter: document.getElementById('typewriter'),
  counterDays: document.getElementById('counter-days'),
  counterHours: document.getElementById('counter-hours'),
  counterMinutes: document.getElementById('counter-minutes'),
  counterSeconds: document.getElementById('counter-seconds'),
  endingScreen: document.getElementById('ending-screen'),
  btnFinalYes: document.getElementById('btn-final-yes'),
  btnFinalSure: document.getElementById('btn-final-sure')
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/* ============================================
   LOADING SCREEN
   ============================================ */
function hideLoadingScreen() {
  setTimeout(() => {
    els.loadingScreen.classList.add('hidden');
  }, 1500);
}

/* ============================================
   LANDING SCREEN - NO BUTTON EVASION
   ============================================ */
function getRandomPosition(element) {
  const padding = 20;
  const maxX = window.innerWidth - element.offsetWidth - padding;
  const maxY = window.innerHeight - element.offsetHeight - padding;
  const x = Math.max(padding, randomInt(0, maxX));
  const y = Math.max(padding, randomInt(0, maxY));
  return { x, y };
}

function moveNoButton() {
  state.noAttempts++;
  const pos = getRandomPosition(els.btnNo);
  els.btnNo.style.position = 'fixed';
  els.btnNo.style.left = pos.x + 'px';
  els.btnNo.style.top = pos.y + 'px';

  // Show funny text
  const text = CONFIG.funnyTexts[randomInt(0, CONFIG.funnyTexts.length - 1)];
  const existing = els.buttonContainer.querySelector('.funny-text');
  if (existing) existing.remove();

  const funnyEl = document.createElement('div');
  funnyEl.className = 'funny-text';
  funnyEl.textContent = text;
  els.buttonContainer.appendChild(funnyEl);

  if (state.noAttempts >= state.maxAttempts) {
    els.btnNo.style.display = 'none';
    const knewIt = document.createElement('p');
    knewIt.className = 'funny-text';
    knewIt.textContent = 'I knew it 🤍';
    knewIt.style.top = '-3rem';
    knewIt.style.fontSize = '1.1rem';
    els.buttonContainer.appendChild(knewIt);
    els.btnYes.classList.add('big');
  }
}

els.btnNo.addEventListener('mouseenter', moveNoButton);
els.btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});
els.btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
});

/* ============================================
   LANDING SCREEN - YES BUTTON
   ============================================ */
els.btnYes.addEventListener('click', () => {
  els.landingScreen.style.transition = 'opacity 0.8s ease';
  els.landingScreen.style.opacity = '0';
  setTimeout(() => {
    els.landingScreen.style.display = 'none';
    els.mainContent.classList.add('visible');
    startCelebration();
    initScrollReveal();
  }, 800);
});

/* ============================================
   CELEBRATION ANIMATION
   ============================================ */
function startCelebration() {
  els.celebrationOverlay.classList.add('active');
  spawnConfetti();
  spawnCelebrationHearts();
  spawnSparkles();

  setTimeout(() => {
    els.celebrationOverlay.classList.remove('active');
  }, 4000);
}

function spawnConfetti() {
  const canvas = els.confettiCanvas;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 150;
  const particles = [];
  const colors = ['#ec4899', '#a855f7', '#fb7185', '#fbbf24', '#ffffff', '#c084fc'];

  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: randomFloat(0, canvas.width),
      y: randomFloat(-canvas.height, 0),
      w: randomFloat(6, 12),
      h: randomFloat(6, 12),
      color: colors[randomInt(0, colors.length - 1)],
      rotation: randomFloat(0, 360),
      rotationSpeed: randomFloat(-10, 10),
      speedX: randomFloat(-3, 3),
      speedY: randomFloat(2, 6),
      opacity: 1
    });
  }

  let frame = 0;
  const maxFrames = 200;

  function animate() {
    if (frame >= maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.005;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    requestAnimationFrame(animate);
  }
  animate();
}

function spawnCelebrationHearts() {
  const emojis = ['❤️', '💖', '💕', '💗', '💓', '🤍'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'celebration-heart';
      heart.textContent = emojis[randomInt(0, emojis.length - 1)];
      heart.style.left = '50%';
      heart.style.top = '50%';
      heart.style.setProperty('--tx', randomFloat(-300, 300) + 'px');
      heart.style.setProperty('--ty', randomFloat(-300, 300) + 'px');
      heart.style.setProperty('--rot', randomFloat(-360, 360) + 'deg');
      els.celebrationOverlay.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }, i * 50);
  }
}

function spawnSparkles() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'celebration-sparkle';
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      sparkle.style.setProperty('--tx', randomFloat(-200, 200) + 'px');
      sparkle.style.setProperty('--ty', randomFloat(-200, 200) + 'px');
      els.celebrationOverlay.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }, i * 30);
  }
}

/* ============================================
   SLIDESHOW
   ============================================ */
const slideshowSections = [
  'section-1', 'section-3', 'section-4',
  'section-5', 'section-6', 'section-7', 'section-8', 'section-9'
];

function startSlideshow() {
  if (state.slideshowActive) return;
  state.slideshowActive = true;
  let index = 0;

  function scrollToNext() {
    if (index >= slideshowSections.length) {
      clearInterval(state.slideshowTimer);
      state.slideshowTimer = null;
      state.slideshowActive = false;
      return;
    }
    const section = document.getElementById(slideshowSections[index]);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    index++;
  }

  scrollToNext();
  state.slideshowTimer = setInterval(scrollToNext, CONFIG.sectionPause);
}

function stopSlideshow() {
  state.slideshowActive = false;
  if (state.slideshowTimer) {
    clearInterval(state.slideshowTimer);
    state.slideshowTimer = null;
  }
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function typeWriter(element, text, speed = CONFIG.typewriterSpeed) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

/* ============================================
   LOVE COUNTER
   ============================================ */
function updateLoveCounter() {
  const start = new Date(CONFIG.loveStartDate).getTime();
  const now = Date.now();
  let diff = Math.floor((now - start) / 1000);
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400);
  diff %= 86400;
  const hours = Math.floor(diff / 3600);
  diff %= 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  els.counterDays.textContent = days;
  els.counterHours.textContent = hours;
  els.counterMinutes.textContent = minutes;
  els.counterSeconds.textContent = seconds;
}

/* ============================================
   LOVE LETTER TYPEWRITER
   ============================================ */
function initBengaliLetter() {
  const section = document.getElementById('section-8');
  if (!section) return;

  // Spawn letter petals and particles
  const petalsContainer = document.getElementById('letter-petals');
  const particlesContainer = document.getElementById('letter-particles');
  if (petalsContainer) {
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('div');
      petal.className = 'letter-petal';
      petal.style.left = randomFloat(0, 100) + '%';
      petal.style.animationDuration = randomFloat(8, 16) + 's';
      petal.style.animationDelay = randomFloat(0, 10) + 's';
      petal.style.width = randomFloat(6, 12) + 'px';
      petal.style.height = petal.style.width;
      petalsContainer.appendChild(petal);
    }
  }
  if (particlesContainer) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'letter-particle';
      particle.style.left = randomFloat(0, 100) + '%';
      particle.style.animationDuration = randomFloat(6, 14) + 's';
      particle.style.animationDelay = randomFloat(0, 8) + 's';
      particle.style.width = randomFloat(2, 4) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const typewriterEl = document.getElementById('letter-typewriter');
        if (typewriterEl && CONFIG.loveLetter) {
          typeWriter(typewriterEl, CONFIG.loveLetter, 18);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(section);
}

function initSection3Typewriter() {
  const section = document.getElementById('section-3');
  if (!section || !CONFIG.typewriterText) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeWriter(els.typewriter, CONFIG.typewriterText, CONFIG.typewriterSpeed);
        const cards = section.querySelectorAll('.story-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), 300 + i * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(section);
}

/* ============================================
   GALLERY LIGHTBOX
   ============================================ */
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      els.lightboxImg.src = src;
      els.lightbox.classList.add('active');
    });
  });

  els.lightboxClose.addEventListener('click', () => {
    els.lightbox.classList.remove('active');
  });

  els.lightbox.addEventListener('click', (e) => {
    if (e.target === els.lightbox) {
      els.lightbox.classList.remove('active');
    }
  });
}

/* ============================================
   CURSOR SPARKLE
   ============================================ */
function initCursorSparkle() {
  document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  });
}

/* ============================================
   KITTEN PEEK ANIMATION
   ============================================ */
function initKittenPeek() {
  const kitten = document.getElementById('kitten-peek');
  const landingCard = document.getElementById('landing-card');
  if (!kitten) return;

  setTimeout(() => {
    kitten.classList.add('visible');

    setTimeout(() => {
      kitten.classList.add('blink');
      setTimeout(() => kitten.classList.remove('blink'), 300);
    }, 600);

    setTimeout(() => {
      kitten.style.transform = 'translateX(0) rotate(-2deg)';
      setTimeout(() => {
        kitten.style.transform = 'translateX(0) rotate(0deg)';
      }, 300);
    }, 1000);

    setTimeout(() => {
      kitten.classList.add('idle');
    }, 1500);
  }, 800);

  if (landingCard) {
    landingCard.addEventListener('mouseenter', () => {
      kitten.style.transform = 'translateX(-20px) rotate(-3deg) scale(1.03)';
      kitten.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    landingCard.addEventListener('mouseleave', () => {
      kitten.style.transform = 'translateX(0) rotate(0deg) scale(1)';
    });
  }
}

/* ============================================
   FLOATING HEARTS BACKGROUND
   ============================================ */
function spawnFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = ['❤️', '💖', '💕', '🤍', '💗', '💓'][randomInt(0, 5)];
  heart.style.left = randomFloat(0, window.innerWidth) + 'px';
  heart.style.fontSize = randomFloat(1, 2.5) + 'rem';
  heart.style.animationDuration = randomFloat(6, 12) + 's';
  heart.style.animationDelay = '0s';
  document.body.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

function startFloatingHearts() {
  setInterval(spawnFloatingHeart, 800);
}

/* ============================================
   FINAL BUTTONS & ENDING SCREEN
   ============================================ */
function showEndingScreen() {
  stopSlideshow();
  els.endingScreen.classList.add('active');
  
  // Floating hearts background
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'ending-floating-heart';
      heart.textContent = ['❤️', '💖', '💕', '🤍'][randomInt(0, 3)];
      heart.style.left = randomFloat(0, window.innerWidth) + 'px';
      heart.style.top = randomFloat(0, window.innerHeight) + 'px';
      heart.style.fontSize = randomFloat(1.5, 4) + 'rem';
      els.endingScreen.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, i * 100);
  }

  // Sparkles around text
  const sparkleContainer = document.getElementById('ending-sparkles');
  if (sparkleContainer) {
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'ending-sparkle';
        const angle = (i / 18) * Math.PI * 2;
        const radius = 80 + randomFloat(0, 60);
        const x = Math.cos(angle) * radius + 50;
        const y = Math.sin(angle) * radius + 50;
        sparkle.style.left = `calc(${x}% + ${randomFloat(-20, 20)}px)`;
        sparkle.style.top = `calc(${y}% + ${randomFloat(-20, 20)}px)`;
        sparkle.style.setProperty('--sx', randomFloat(-12, 12) + 'px');
        sparkle.style.setProperty('--sy', randomFloat(-12, 12) + 'px');
        sparkle.style.animationDelay = randomFloat(0, 3) + 's';
        sparkleContainer.appendChild(sparkle);
      }, 2500 + i * 80);
    }
  }
}

els.btnFinalYes.addEventListener('click', showEndingScreen);
els.btnFinalSure.addEventListener('click', showEndingScreen);

/* ============================================
   DYNAMIC CONTENT POPULATION
   ============================================ */
function initTimeline() {
  const container = document.querySelector('.timeline');
  if (!container || !CONFIG.timelineItems) return;
  container.innerHTML = '';
  CONFIG.timelineItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <span class="timeline-icon">${item.icon}</span>
      <div class="timeline-text">
        <div>${item.text}</div>
        ${item.date ? `<div style="font-size:0.85rem;opacity:0.7;">${item.date}</div>` : ''}
      </div>
    `;
    container.appendChild(div);
  });
}

function initPolaroidGallery() {
  const section = document.getElementById('section-5');
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = section.querySelectorAll('.polaroid-mem-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), 150 + i * 180);
        });

        const sparkleContainer = document.getElementById('heart-sparkles');
        if (sparkleContainer) {
          for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'polaroid-heart-sparkle';
            const angle = (i / 12) * Math.PI * 2;
            const radius = 50 + randomFloat(0, 30);
            sparkle.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
            sparkle.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
            sparkle.style.setProperty('--sx', randomFloat(-15, 15) + 'px');
            sparkle.style.setProperty('--sy', randomFloat(-15, 15) + 'px');
            sparkle.style.animationDelay = randomFloat(0, 2.5) + 's';
            sparkleContainer.appendChild(sparkle);
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}

/* ============================================
   HERO EFFECTS
   ============================================ */
function initHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const colors = ['#ec4899', '#a855f7', '#fb7185', '#fbbf24', '#ffffff'];
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = randomFloat(0, 100) + '%';
    particle.style.animationDuration = randomFloat(8, 16) + 's';
    particle.style.animationDelay = randomFloat(0, 10) + 's';
    particle.style.width = randomFloat(2, 5) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[randomInt(0, colors.length - 1)];
    container.appendChild(particle);
  }
}

function initHeroPetals() {
  const container = document.getElementById('hero-petals');
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement('div');
    petal.className = 'hero-petal';
    petal.style.left = randomFloat(0, 100) + '%';
    petal.style.animationDuration = randomFloat(10, 20) + 's';
    petal.style.animationDelay = randomFloat(0, 15) + 's';
    petal.style.width = randomFloat(8, 14) + 'px';
    petal.style.height = petal.style.width;
    container.appendChild(petal);
  }
}

function initHeroParallax() {
  const hero = document.querySelector('.hero-section');
  const bgLayers = document.querySelector('.hero-bg-layers');
  if (!hero || !bgLayers) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    bgLayers.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    bgLayers.style.transition = 'transform 0.6s ease-out';
    bgLayers.style.transform = 'translate(0, 0)';
    setTimeout(() => {
      bgLayers.style.transition = '';
    }, 600);
  });
}

function initHeroScrollIndicator() {
  const indicator = document.getElementById('hero-scroll-indicator');
  if (!indicator) return;
  indicator.addEventListener('click', () => {
    const nextSection = document.getElementById('section-3');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ============================================
   INITIALIZATION
   ============================================ */
function init() {
  hideLoadingScreen();
  initCursorSparkle();
  startFloatingHearts();
  initLightbox();
  initTimeline();
  initPolaroidGallery();
  initKittenPeek();

  // Hero effects
  initHeroParticles();
  initHeroPetals();
  initHeroParallax();
  initHeroScrollIndicator();

  // Initialize dynamic content
  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);
  initBengaliLetter();
  initSection3Typewriter();

  // Handle window resize for confetti canvas
  window.addEventListener('resize', () => {
    if (els.confettiCanvas) {
      els.confettiCanvas.width = window.innerWidth;
      els.confettiCanvas.height = window.innerHeight;
    }
  });
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
