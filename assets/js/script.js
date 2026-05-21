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