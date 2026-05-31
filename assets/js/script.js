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
  const footerYear = document.getElementById("year");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear().toString();
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
    const successMessage = document.getElementById("form-success");

    const nameError = document.querySelector('[data-for="name"]');
    const emailError = document.querySelector('[data-for="email"]');
    const subjectError = document.querySelector('[data-for="subject"]');
    const messageError = document.querySelector('[data-for="message"]');

    // Clear all previous errors
    function clearErrors() {

      contactForm.querySelectorAll(".error-message").forEach(function (message) {
        message.textContent = "";
      });

      contactForm.querySelectorAll("input, textarea").forEach(function (field) {
        field.classList.remove("error");
      });

      successMessage.textContent = "";
    }

    // Form submit event
    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      clearErrors();

      let isValid = true;

      // Name validation
      if (nameInput.value.trim() === "") {

        nameInput.classList.add("error");

        nameError.textContent = "Please enter your name.";

        isValid = false;
      }

      // Email validation
      if (
        emailInput.value.trim() === "" ||
        !emailInput.value.includes("@")
      ) {

        emailInput.classList.add("error");

        emailError.textContent = "Please enter a valid email.";

        isValid = false;
      }

      // Subject validation
      if (subjectInput.value.trim() === "") {

        subjectInput.classList.add("error");

        subjectError.textContent = "Please enter a subject.";

        isValid = false;
      }

      // Message validation
      if (messageInput.value.trim() === "") {

        messageInput.classList.add("error");

        messageError.textContent = "Please enter a message.";

        isValid = false;
      }

      // Successful form submission
      if (isValid) {

        successMessage.textContent =
          "Thank you for your message. We will get back to you soon!";

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