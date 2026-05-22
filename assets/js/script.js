document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ──────────────────────────────────────
  // Hero Slideshow
  // ──────────────────────────────────────
  const slideshowTrack = document.querySelector('.slideshow-track');
  if (slideshowTrack) {
    const slides = slideshowTrack.querySelectorAll('.slideshow-slide');
    const dots = document.querySelectorAll('.slideshow-dot');
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    function goToSlide(index) {
      if (isTransitioning || index === currentSlide) return;
      isTransitioning = true;

      // Remove active from current
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      // Update current
      currentSlide = index;

      // Add active to new
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');

      // Allow transition after animation completes
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }

    // Auto-advance slides every 5 seconds
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    // Dot click handlers
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-slide'));
        goToSlide(index);
        // Reset interval on manual interaction
        stopSlideshow();
        startSlideshow();
      });
    });

    // Pause on hover
    slideshowTrack.addEventListener('mouseenter', stopSlideshow);
    slideshowTrack.addEventListener('mouseleave', startSlideshow);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slideshowTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopSlideshow();
    }, { passive: true });

    slideshowTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left - next
          nextSlide();
        } else {
          // Swipe right - previous
          const prev = (currentSlide - 1 + slides.length) % slides.length;
          goToSlide(prev);
        }
      }
      startSlideshow();
    });

    // Start the slideshow
    startSlideshow();
  }

  // ──────────────────────────────────────
  // Contact Form Validation
  // ──────────────────────────────────────
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const storedMessage = sessionStorage.getItem("formSuccess");
  if (storedMessage) {
    const successEl = document.getElementById("form-success");
    if (successEl) {
      successEl.textContent = storedMessage;
    }

    sessionStorage.removeItem("formSuccess");

    setTimeout(() => {
      if (successEl) {
        successEl.textContent = "";
      }
    }, 5000);
  }

  const fields = {
    name: {
      required: true,
      minLength: 2,
      message: "Please enter your full name (at least 2 characters).",
    },
    email: {
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Please enter a valid email address.",
    },
    phone: {
      required: false,
      validate: (value) => value === "" || /^[0-9+\-\s()]{6,}$/.test(value),
      message: "Please enter a valid phone number.",
    },
    subject: {
      required: true,
      minLength: 4,
      message: "Please provide a subject (at least 4 characters).",
    },
    message: {
      required: true,
      minLength: 10,
      message: "Please provide some details (at least 10 characters).",
    },
  };

  const showError = (input, text) => {
    input.classList.add("error");
    const msg = contactForm.querySelector(`.error-message[data-for="${input.id}"]`);
    if (msg) msg.textContent = text;
  };

  const clearError = (input) => {
    input.classList.remove("error");
    const msg = contactForm.querySelector(`.error-message[data-for="${input.id}"]`);
    if (msg) msg.textContent = "";
  };

  const validateField = (id) => {
    const config = fields[id];
    const input = contactForm.elements[id];
    if (!config || !input) return true;

    const value = input.value.trim();
    if (config.required && value === "") {
      showError(input, config.message);
      return false;
    }
    if (config.minLength && value !== "" && value.length < config.minLength) {
      showError(input, config.message);
      return false;
    }
    if (config.validate && !config.validate(value)) {
      showError(input, config.message);
      return false;
    }

    clearError(input);
    return true;
  };

  Object.keys(fields).forEach((id) => {
    const input = contactForm.elements[id];
    if (!input) return;
    input.addEventListener("blur", () => validateField(id));
    input.addEventListener("input", () => clearError(input));
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach((id) => {
      if (!validateField(id)) {
        isValid = false;
      }
    });

    const successEl = document.getElementById("form-success");
    if (!isValid) {
      if (successEl) {
        successEl.textContent = "";
      }
      return;
    }

    sessionStorage.setItem("formSuccess", "Thank you for your message. We will contact you shortly.");

    window.location.reload();
  });
});