document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const fields = [
    { id: "name", message: "Please enter your name." },
    { id: "email", message: "Please enter a valid email address." },
    { id: "subject", message: "Please enter a subject." },
    { id: "message", message: "Please enter your message." }
  ];

  function validateField(field, message) {
    const error = document.querySelector(`#${field.id}-error`);
    if (!field.checkValidity()) {
      field.classList.add("invalid");
      error.textContent = message;
      return false;
    }
    field.classList.remove("invalid");
    error.textContent = "";
    return true;
  }

  fields.forEach(({ id, message }) => {
    const field = document.getElementById(id);
    field.addEventListener("blur", () => validateField(field, message));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field, message);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    let valid = true;
    fields.forEach(({ id, message }) => {
      const field = document.getElementById(id);
      if (!validateField(field, message)) valid = false;
    });

    const status = document.getElementById("form-status");
    if (!valid) {
      status.textContent = "Please correct the highlighted fields and try again.";
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    status.textContent = "Thank you! Your message has been validated. Connect this form to a server or form service before using it in production.";
    form.reset();
  });
});
