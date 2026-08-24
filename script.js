// Pipeline nav: highlights the current stage, marks earlier ones as "done",
// and grows the progress fill line as the visitor scrolls through the page —
// modeled on a running training/CI pipeline.

const stages = Array.from(document.querySelectorAll(".stage"));
const sections = stages.map((s) => document.getElementById(s.dataset.target));
const fill = document.getElementById("pipelineFill");
const track = document.querySelector(".pipeline-track");

function setActiveIndex(activeIndex) {
  stages.forEach((stage, i) => {
    stage.classList.toggle("is-active", i === activeIndex);
    stage.classList.toggle("is-done", i < activeIndex);
  });

  if (track && stages[activeIndex]) {
    const trackRect = track.getBoundingClientRect();
    const nodeRect = stages[activeIndex].querySelector(".stage-node").getBoundingClientRect();
    const width = nodeRect.left - trackRect.left + nodeRect.width / 2 - 24;
    fill.style.width = Math.max(0, width) + "px";
  }
}

function updateActiveStage() {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  let activeIndex = 0;

  sections.forEach((section, i) => {
    if (section && section.offsetTop <= scrollPos) {
      activeIndex = i;
    }
  });

  setActiveIndex(activeIndex);
}

stages.forEach((stage) => {
  stage.addEventListener("click", () => {
    const target = document.getElementById(stage.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("scroll", updateActiveStage, { passive: true });
window.addEventListener("resize", updateActiveStage);
window.addEventListener("load", updateActiveStage);
