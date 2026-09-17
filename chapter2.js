document.addEventListener('DOMContentLoaded', () => {
  // Loading Screen
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainContent.style.display = 'block';
      // Slight delay to allow display block to render before opacity transition
      setTimeout(() => {
        mainContent.style.opacity = '1';
        initScrollReveal();
      }, 50);
    }, 800);
  }, 2000);

  // Scroll Reveal Logic (similar to script.js but using visible)
  const revealElements = document.querySelectorAll('.reveal');
  
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
    
    // Trigger initially for elements in view
    setTimeout(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }, 100);
  }

  // Hold to Continue Logic
  const holdBtn = document.getElementById('hold-to-continue');
  const holdProgress = document.querySelector('.hold-progress');
  const holdText = document.querySelector('.hold-text');
  const finalRevelation = document.getElementById('final-revelation');
  
  let holdTimer;
  let progress = 0;
  const holdDuration = 1500; // 1.5 seconds hold
  const intervalTime = 20; // ms
  const increment = (intervalTime / holdDuration) * 100;

  const startHold = (e) => {
    // Prevent default touch behavior to avoid selecting text or scrolling while holding
    if(e.type === 'touchstart' || e.type === 'touchmove') e.preventDefault();
    
    holdBtn.style.transform = 'scale(0.95)';
    holdBtn.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.5)';
    holdText.style.color = 'white'; // Change text color to contrast with progress bar
    
    holdTimer = setInterval(() => {
      progress += increment;
      if(progress >= 100) {
        progress = 100;
        completeHold();
      }
      holdProgress.style.width = `${progress}%`;
    }, intervalTime);
  };

  const endHold = () => {
    clearInterval(holdTimer);
    if(progress < 100) {
      progress = 0;
      holdProgress.style.width = '0%';
      holdBtn.style.transform = 'scale(1)';
      holdBtn.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.15)';
      holdText.style.color = 'var(--accent-pink)';
    }
  };

  const completeHold = () => {
    clearInterval(holdTimer);
    holdBtn.style.pointerEvents = 'none';
    holdBtn.style.opacity = '0';
    holdBtn.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
      holdBtn.style.display = 'none';
      finalRevelation.classList.add('show');
      
      // Scroll to show the final message
      setTimeout(() => {
        finalRevelation.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }, 800);
  };

  holdBtn.addEventListener('mousedown', startHold);
  holdBtn.addEventListener('mouseup', endHold);
  holdBtn.addEventListener('mouseleave', endHold);
  
  holdBtn.addEventListener('touchstart', startHold, { passive: false });
  holdBtn.addEventListener('touchend', endHold);
  holdBtn.addEventListener('touchcancel', endHold);
});

// Envelopes Logic
window.openEnvelope = function(element) {
  element.classList.toggle('opened');
};
