
document.addEventListener("DOMContentLoaded", function () {

  // ──────────────────────────────────────
  // 1. Mobile Navigation Toggle
  // ──────────────────────────────────────
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      siteNav.classList.toggle("open");
    });
  }

  // ──────────────────────────────────────
  // 2. Footer Year Update
  // ──────────────────────────────────────
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // ──────────────────────────────────────
  // 3. Hero Slideshow
  // ──────────────────────────────────────
  const slides = document.querySelectorAll(".slideshow-slide");

  if (slides.length > 0) {
    let currentSlide = 0;

    setInterval(function () {

      // Remove active class from current slide
      slides[currentSlide].classList.remove("active");

      // Move to next slide
      currentSlide++;

      // Return to first slide if at end
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      // Show next slide
      slides[currentSlide].classList.add("active");

      // Change Slide every 5 seconds
    }, 5000);
  }

  // ──────────────────────────────────────
  // 4. Contact Form Validation
  // ──────────────────────────────────────
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const successEl = document.getElementById("form-success");

    // Clear all previous errors
    function clearErrors() {

      document.querySelectorAll(".error-message").forEach(function (msg) {
        msg.textContent = "";
      });

      document.querySelectorAll("input, textarea").forEach(function (field) {
        field.classList.remove("error");
      });

      successEl.textContent = "";
    }

    // Show error message
    function showError(input, message) {

      input.classList.add("error");

      const errorEl = document.querySelector(
        `.error-message[data-for="${input.id}"]`
      );

      if (errorEl) {
        errorEl.textContent = message;
      }
    }

    // Form submit event
    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      clearErrors();

      let isValid = true;

      // Name validation
      if (nameInput.value.trim() === "") {

        showError(nameInput, "Please enter your name.");

        isValid = false;
      }

      // Email validation
      if (
        emailInput.value.trim() === "" ||
        !emailInput.value.includes("@")
      ) {

        showError(emailInput, "Please enter a valid email.");

        isValid = false;
      }

      // Subject validation
      if (subjectInput.value.trim() === "") {

        showError(subjectInput, "Please enter a subject.");

        isValid = false;
      }

      // Message validation
      if (messageInput.value.trim() === "") {

        showError(messageInput, "Please enter a message.");

        isValid = false;
      }

      // Successful form submission
      if (isValid) {

        successEl.textContent =
          "Thank you for your message. We will get back to you soon!";

        // Clear form
        contactForm.reset();

        // Refresh page after 3 seconds
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      }
    });

    // Clear errors while typing
    contactForm.addEventListener("input", clearErrors);
  }
});