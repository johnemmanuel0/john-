
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll("a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });
    }
  });
}, { rootMargin: "-25% 0px -60% 0px" });

sections.forEach(section => observer.observe(section));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !email || !message) {
    status.textContent = "Please complete all fields.";
    return;
  }

  const recipient = "your.email@example.com";
  const subject = encodeURIComponent("Portfolio enquiry from " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\n\n" + message
  );

  status.textContent = "Opening your email application...";
  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
});
