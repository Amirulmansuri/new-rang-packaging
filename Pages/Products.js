// Header or nav bar



// Header/menu behavior with active link handling and responsive reset
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("navbar");
const navLinks = document.querySelectorAll('.nav ul li a:not(.btn)');
const allNavLinks = document.querySelectorAll('.nav ul li a');

// toggle mobile nav
menuToggle.addEventListener("click", () => {
    const isActive = nav.classList.toggle("active");
    menuToggle.textContent = isActive ? "✖" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isActive));
});

// set active class on click for non-CTA nav links
function setActiveLink(link) {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
}

// Add click handler to nav links (non-CTA)
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        setActiveLink(link);

        // close mobile nav if open
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});






// Active link new code






// If page loads with an anchor/hash, mark matching link active
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;

    // match current page
    allNavLinks.forEach(link => {
        if (link.getAttribute("href") && currentPath.includes(link.getAttribute("href").replace(".html", ""))) {
            setActiveLink(link);
        }
    });

    // If nothing matched, fallback to Home
    if (!document.querySelector('.nav ul li a.active')) {
        const homeLink = document.querySelector('.nav ul li a[href="/index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }
});







// Ensure CTA links do not receive the active underline (no handler)

// If page loads with an anchor/hash, mark matching link active
document.addEventListener("DOMContentLoaded", () => {
    const currentHash = window.location.hash;
    if (currentHash) {
        const startLink = document.querySelector(`.nav ul li a[href="${currentHash}"]`);
        if (startLink) setActiveLink(startLink);
    } else {
        // optional: mark Home as active by default
        const homeLink = document.querySelector('.nav ul li a[href="#hero-section"]');
        if (homeLink) homeLink.classList.add('active');
    }
});

// When window resizes to desktop width, ensure mobile menu is closed
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }
});








// 
// Select all buttons with class "contact-btn"



document.querySelectorAll(".contact-btn").forEach(button => {
    button.addEventListener("click", function () {
        document.getElementById("contact-form").scrollIntoView({
            behavior: "smooth"
        });
    });
});


