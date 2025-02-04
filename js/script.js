// NAVBAR
// Select the div where the navbar will be inserted
const navbarContainer = document.getElementById('navbar');

// Fetch and load the navbar HTML into the div
fetch('navbar.html')
  .then((response) => response.text())
  .then((data) => {
    navbarContainer.innerHTML = data;

    // Call function to initialize navbar interactions
    initNavbar();
    // Set active state based on current page
    setActiveNavLink();
  })
  .catch((error) => console.error('Error loading navbar:', error));

function initNavbar() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');

      // Update accessibility attribute
      const isOpen = !mobileMenu.classList.contains('hidden');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function setActiveNavLink() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Select all nav links (both desktop and mobile)
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Remove active class from all links
  allNavLinks.forEach((link) => {
    link.classList.remove('active');
  });

  // Add active class to links that match current page
  allNavLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Call setActiveNavLink when page loads
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
});

// Fetch and load the footer HTML into the div
const footerContainer = document.getElementById('footer');

fetch('footer.html')
  .then((response) => response.text())
  .then((data) => {
    footerContainer.innerHTML = data;
  })
  .catch((error) => console.error('Error loading footer:', error));

/* ABOUT SECTION */
/* Education section*/
document.addEventListener('DOMContentLoaded', function () {
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Add staggered animation delay to timeline items
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  timelineItems.forEach((item) => observer.observe(item));
});

/* Skills sections */
document.addEventListener('DOMContentLoaded', function () {
  const skillCards = document.querySelectorAll('.skill-card');

  // Animate skill cards on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';

          // Animate progress bars
          const progressBars = entry.target.querySelectorAll('.progress');
          progressBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
  });

  // Add hover effect for skill cards
  skillCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const progressBars = card.querySelectorAll('.progress');
      progressBars.forEach((bar) => {
        bar.style.transition = 'width 0.3s ease';
      });
    });
  });
});

// PORTFOLIO
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // Initialize with animation
  portfolioItems.forEach((item, index) => {
    item.querySelector(
      '.project-card'
    ).style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
  });

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter items
      portfolioItems.forEach((item) => {
        const categories = item.getAttribute('data-category').split(' ');
        const card = item.querySelector('.project-card');

        // Reset animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow

        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.portfolio-card');

  cards.forEach((card) => {
    card.addEventListener('mouseover', function () {
      this.style.boxShadow = '0 10px 20px rgba(92, 235, 223, 0.5)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('Footer loaded successfully!');
});

/* FOOTER */
document.addEventListener('DOMContentLoaded', function () {
  // Animate social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach((link, index) => {
    link.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
  });

  // Update copyright year automatically
  const yearSpan = document.querySelector('.copyright-year');
  yearSpan.textContent = new Date().getFullYear();
});

// CONTACT
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    subject: /^.{2,100}$/,
    message: /^[\s\S]{10,500}$/,
  };

  // Error messages
  const errorMessages = {
    name: 'Please enter a valid name (2-30 characters)',
    email: 'Please enter a valid email address',
    subject: 'Subject must be between 2 and 100 characters',
    message: 'Message must be between 10 and 500 characters',
  };

  // Real-time validation
  form.querySelectorAll('input, textarea').forEach((field) => {
    ['input', 'blur'].forEach((eventType) => {
      field.addEventListener(eventType, () => validateField(field));
    });
  });

  // Field validation function
  function validateField(field) {
    const errorDisplay = field.nextElementSibling;

    if (!field.value.trim()) {
      showError(field, errorDisplay, `${field.placeholder} is required`);
      return false;
    }

    if (!patterns[field.id].test(field.value)) {
      showError(field, errorDisplay, errorMessages[field.id]);
      return false;
    }

    showSuccess(field, errorDisplay);
    return true;
  }

  // Show error message
  function showError(field, errorDisplay, message) {
    field.classList.add('border-red-500');
    errorDisplay.textContent = message;
    errorDisplay.classList.remove('hidden');
  }

  // Show success
  function showSuccess(field, errorDisplay) {
    field.classList.remove('border-red-500');
    errorDisplay.classList.add('hidden');
  }

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    form.querySelectorAll('input, textarea').forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Here you would typically send the form data to a server
      form.reset();
      successMessage.classList.remove('hidden');

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    }
  });
});
