const body = document.body;
const nav = document.querySelector("nav");
const toggleMenu = document.querySelector(".hamburger");
const container = document.querySelector(".container");
const navLinks = document.querySelectorAll(".nav__list li a");

// hamburger clicked
toggleMenu.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        body.style.overflow = "hidden";
        container.style.filter = "blur(2px)";
    } else {
        body.style.overflow = "auto";
        container.style.filter = "none";
    }
});
// close nav when a navlink is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        body.style.overflow = "auto";
        container.style.filter = "none";
    });
});

// Sticky navbar

let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        body.classList.remove("scroll-up");
    }
    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
    }
    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.add("scroll-up");
        body.classList.remove("scroll-down");
    }
    lastScroll = currentScroll;

    // Scroll-back-top button display position
    const goTop = document.querySelector(".go-top");
    if (currentScroll >= 700) {
        goTop.style.transform = "translateY(0)";
    } else {
        goTop.style.transform = "translateY(10rem)";
    }
});

//animation on scroll

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add("show");
    });
});

hiddenElements.forEach((el) => observer.observe(el));

const staggerdElements = document.querySelectorAll(".stag");

const observerTwo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add("staggerd");
    });
});

staggerdElements.forEach((el) => observerTwo.observe(el));

//control eye with mouse

window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const anchor = document.querySelector(".header__avatar-img");
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
        eye.style.transform = `rotate(${angleDeg - 45}deg)`;
    });
});

function angle(cx, cy, ex, ey) {
    const dx = ex - cx;
    const dy = ey - cy;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
}