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




// Hero Section







// HERO section JS (standalone)

// Smooth scroll "Know More" button; scrolls to #products if present.
document.addEventListener('DOMContentLoaded', () => {
    const knowMoreBtn = document.getElementById('know-more');
    const muteToggle = document.getElementById('mute-toggle');
    const video = document.querySelector('.background-video');

    if (knowMoreBtn) {
        knowMoreBtn.addEventListener('click', () => {
            const target = document.getElementById('products');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                target.focus({ preventScroll: true });
            }
        });
    }

    // Mute/unmute toggle
    if (muteToggle && video) {
        // initialize aria-pressed based on actual muted state
        muteToggle.setAttribute('aria-pressed', String(!video.muted));
        muteToggle.addEventListener('click', () => {
            // toggle muted
            video.muted = !video.muted;
            // update aria-pressed to reflect "sound on" state -> true when unmuted
            muteToggle.setAttribute('aria-pressed', String(!video.muted));
            // update label for screen readers
            muteToggle.setAttribute('aria-label', video.muted ? 'Unmute background media' : 'Mute background media');
            // visual icon (simple swap)
            muteToggle.textContent = video.muted ? '🔇' : '🔈';
        });
    }

    // Handle prefers-reduced-motion: pause the video to respect users
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches && video) {
        try { video.pause(); } catch (e) { /* ignore */ }
    }

    // On some mobile browsers autoplay is blocked; if video is paused show fallback image by hiding video element
    if (video) {
        video.addEventListener('error', () => video.style.display = 'none');
        // if the video fails to play (autoplay blocked), hide it so poster/fallback shows cleanly
        video.play().catch(() => {
            video.style.display = 'none';
        });
    }
});





// Hero Section Know More Button

  document.getElementById("know-more").addEventListener("click", function() {
    window.location.href = "/Pages/Products.html";
  });










// Prodcut's caraousals





// Services carousel: autoplay, controls, dots, keyboard + touch
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('servicesCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    const AUTOPLAY_MS = 3500;
    let current = 0;
    let autoplayTimer = null;
    let isHovering = false;

    // Create dots
    slides.forEach((slide, idx) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        btn.dataset.index = idx;
        btn.addEventListener('click', () => { goTo(idx); startAutoplay(); });
        dotsWrap.appendChild(btn);
    });
    const dots = Array.from(dotsWrap.children);

    // Show slide by index using display toggle (simple & robust)
    function goTo(idx) {
        idx = ((idx % slides.length) + slides.length) % slides.length;
        slides.forEach((s, i) => {
            if (i === idx) {
                s.style.display = 'block';
                s.setAttribute('aria-hidden', 'false');
            } else {
                s.style.display = 'none';
                s.setAttribute('aria-hidden', 'true');
            }
        });
        dots.forEach((d, i) => d.setAttribute('aria-pressed', i === idx ? 'true' : 'false'));
        current = idx;
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => { if (!isHovering) next(); }, AUTOPLAY_MS);
    }
    function stopAutoplay() { if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; }

    // Init
    goTo(0);
    startAutoplay();

    // Controls
    nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

    // Pause on hover/focus
    [carousel, ...slides, ...dots].forEach(el => {
        el.addEventListener('mouseenter', () => { isHovering = true; });
        el.addEventListener('mouseleave', () => { isHovering = false; });
        el.addEventListener('focusin', () => { isHovering = true; });
        el.addEventListener('focusout', () => { isHovering = false; });
    });

    // Keyboard
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });
    carousel.tabIndex = 0;

    // Touch swipe
    let startX = null;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const diff = (e.changedTouches[0].clientX - startX);
        if (Math.abs(diff) > 40) { if (diff < 0) next(); else prev(); startAutoplay(); }
        startX = null;
    });
});






// indian Map


// Optional: Add some animation delay so markers appear one after another
document.addEventListener("DOMContentLoaded", () => {
    const markers = document.querySelectorAll(".marker");
    markers.forEach((marker, index) => {
        marker.style.animationDelay = `${index * 0.2}s`;
    });
});






// Bussiness Corporates Categoires




// Scroll animation for business cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".business-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});







// Indian Map Section






// Simple fade-in animation for markers
document.addEventListener("DOMContentLoaded", () => {
    const markers = document.querySelectorAll(".map-marker");
    markers.forEach((marker, index) => {
        setTimeout(() => {
            marker.style.opacity = "1";
            marker.style.transform = "translate(-50%, -50%) scale(1)";
        }, index * 400);
    });
});
