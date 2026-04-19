// year
document.getElementById("year").textContent = new Date().getFullYear();

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".card, .principles li, .section__head, .hero__glyph").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

// contact form -> opens user's mail client with a well-formed message
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const TO = "janusz.maciejewski@gmail.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const company = (data.get("company") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    status.textContent = "Please fill in name, email, and a short message.";
    status.style.color = "#ff8a65";
    return;
  }

  const subject = `[d4b] Inquiry from ${name}${company ? " · " + company : ""}`;
  const body =
`Hi Janusz,

${message}

—
${name}${company ? "\n" + company : ""}
${email}
`;
  const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;

  status.style.color = "";
  status.textContent = "Opening your mail client… if nothing happens, write directly to " + TO + ".";
});
