// Constants
const TYPING_SETTINGS = {
  words: ['Full Stack Developer', 'Competitive Programmer', 'Problem Solver'],
  waitTime: 2000,
  typeSpeed: 100
};

const SCROLL_SETTINGS = {
  navbarScrollThreshold: 50,
  sectionOffsetDivisor: 3
};

// Smooth Scroll Handler
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
              
              // Close mobile menu if open
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse?.classList.contains('show')) {
                  navbarCollapse.classList.remove('show');
              }
          }
      });
  });
}

// Typing Effect Class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
      if (!txtElement) throw new Error('Text element is required');
      if (!Array.isArray(words) || !words.length) throw new Error('Words array is required');

      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.isDeleting = false;
      this.type();
  }

  type() {
      try {
          const current = this.wordIndex % this.words.length;
          const fullTxt = this.words[current];

          // Handle deletion/typing
          this.txt = this.isDeleting 
              ? fullTxt.substring(0, this.txt.length - 1)
              : fullTxt.substring(0, this.txt.length + 1);

          this.txtElement.innerHTML = this.txt;

          // Calculate type speed
          let typeSpeed = TYPING_SETTINGS.typeSpeed;
          if (this.isDeleting) typeSpeed /= 2;

          // Handle word completion
          if (!this.isDeleting && this.txt === fullTxt) {
              typeSpeed = this.wait;
              this.isDeleting = true;
          } else if (this.isDeleting && this.txt === '') {
              this.isDeleting = false;
              this.wordIndex++;
              typeSpeed = 500;
          }

          setTimeout(() => this.type(), typeSpeed);
      } catch (error) {
          console.error('Typing error:', error);
      }
  }
}

// Navbar Handler
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  // Scroll Progress
  function updateScrollProgress() {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight);
      scrollProgress.style.transform = `scaleX(${scrolled})`;
  }

  // Active Section Tracking
  function updateActiveSection() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= (sectionTop - sectionHeight/SCROLL_SETTINGS.sectionOffsetDivisor)) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  }

  // Scroll Event Handler
  window.addEventListener('scroll', () => {
      if (window.scrollY > SCROLL_SETTINGS.navbarScrollThreshold) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
      
      updateScrollProgress();
      updateActiveSection();
  });
}

// Initialize Everything
function init() {
  try {
      initSmoothScroll();
      initNavbar();

      const txtElement = document.querySelector('.typing-text');
      if (txtElement) {
          new TypeWriter(txtElement, TYPING_SETTINGS.words, TYPING_SETTINGS.waitTime);
      } else {
          console.warn('Typing text element not found');
      }
  } catch (error) {
      console.error('Initialization error:', error);
  }
}

// Start on DOM Load
document.addEventListener('DOMContentLoaded', init);