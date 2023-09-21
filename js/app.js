const body = document.body;
const nav = document.querySelector("nav");
const toggleMenu = document.querySelector(".hamburger");
const container = document.querySelector(".container");
const navLinks = document.querySelectorAll(".nav__list li a");

//-----------------------preloader---------------------------

// carregamento do logotipo animado SVG
const animatedLogo = document.getElementById("animatedLogo");
animatedLogo.addEventListener("load", () => {
    animatedLogo.style.display = "block";
});

// preloader
window.addEventListener("load", function () {
    var preloader = document.getElementById("preloader");
    this.setTimeout(() => {
        preloader.style.display = "none";
        body.style.overflow = "visible";
    }, 2000);
});

//--------------------responsive hamburger--------------------

// hamburger
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
// fechar navegação quando um link de navegação é clicado
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        body.style.overflow = "auto";
        container.style.filter = "none";
    });
});

//--------------------------------Sticky navbar---------------------------------

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

    // Posição de exibição do botão scroll-back-top
    const goTop = document.querySelector(".go-top");
    if (currentScroll >= 700) {
        goTop.style.transform = "translateY(0)";
    } else {
        goTop.style.transform = "translateY(10rem)";
    }
});

//---------------------logo animation-----------------------

// Animação de entrada de cabeçalho

const anim = anime.timeline({
    loop: false,
    direction: "alternate",
});

let durationTime = 500;

anim.add({
    targets: "#animatedLogo path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutQuart",
    duration: 1000,
});

anim.add({
    targets: "#animatedLogo #letter",
    duration: 1000,
    opacity: 1,
    easing: "easeInOutQuart",
})
    .add(
        {
            targets: "nav",
            translateY: [-25, 0],
            opacity: [0, 1],
            easing: "linear",
            duration: durationTime,
        },
        "-=500"
    )
    .add(
        {
            targets: ".nav__list li",
            translateY: [-25, 0],
            opacity: [0, 1],
            duration: durationTime,
            easing: "linear",
            delay: (el, i) => {
                return 300 + 100 * i;
            },
        },
        "-=250"
    )
    .add(
        {
            targets: ".header__text-content > *",
            translateY: [50, 0],
            opacity: [0, 1],
            easing: "linear",
            duration: durationTime,
            delay: (el, i) => {
                return 300 + 100 * i;
            },
        },
        "-=150"
    )
    .add(
        {
            targets: ".header__avatar",
            opacity: [0, 1],
            easing: "linear",
            duration: durationTime,
        },
        "-=100"
    )
    .add(
        {
            targets: ".media-links",
            translateY: [50, 0],
            opacity: [0, 1],
            duration: durationTime,
            easing: "linear",
            delay: (el, i) => {
                return 300 + 100 * i;
            },
        },
        "-=500"
    )
    .add(
        {
            targets: ".gmail",
            translateY: [20, 0],
            opacity: [0, 1],
            duration: durationTime,
            easing: "linear",
        },
        "-=500"
    )
    .add({
        targets: ".scroll",
        opacity: [0, 1],
        easing: "linear",
        duration: durationTime,
        delay: (el, i) => {
            return 300 + 100 * i;
        },
    });

// Mostrar div ao rolar
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target,
                opacity: "1",
                duration: 1000,
                easing: "easeInOutQuad",
            });

            observer.unobserve(entry.target);
        }
    });
});

const items = document.querySelectorAll(".translateUp");

items.forEach((item) => {
    observer.observe(item);
});

//------------------controlar olho com mouse---------------------

const eyes = document.querySelectorAll(".eye");
const anchor = document.querySelector(".header__avatar-img");

window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
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

// Redefinir a posição dos olhos se o usuário estiver inativo por 5 segundo

let userInactivityTimer;

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);

// Função para zerar o temporizador de inatividade do usuário
function resetTimer() {
    clearTimeout(userInactivityTimer);
    userInactivityTimer = setTimeout(handleUserInactive, 5000);
}

function handleUserInactive() {
    eyes.forEach((eye) => {
        eye.classList.add("inactive-eye");
    });
}

function handleUserActive() {
    eyes.forEach((eye) => {
        eye.classList.remove("inactive-eye");
    });
}

document.addEventListener("mousemove", handleUserActive);
document.addEventListener("keydown", handleUserActive);