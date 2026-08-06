const progressBar = document.querySelector("#progressBar");
const revealItems = document.querySelectorAll(".reveal");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const trackedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
};

const updateNavigation = () => {
    let activeSection = "";

    trackedSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 180) {
            activeSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeSection}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
};

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}

window.addEventListener("scroll", () => {
    updateProgress();
    updateNavigation();
}, { passive: true });

document.querySelector("#year").textContent = new Date().getFullYear();
updateProgress();
updateNavigation();
