// Simple scroll-spy: highlights the nav link for the section currently in view.

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks.map((link) => document.getElementById(link.dataset.target));

function updateActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  let activeIndex = -1;

  sections.forEach((section, i) => {
    if (section && section.offsetTop <= scrollPos) {
      activeIndex = i;
    }
  });

  navLinks.forEach((link, i) => link.classList.toggle("is-active", i === activeIndex));
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);
