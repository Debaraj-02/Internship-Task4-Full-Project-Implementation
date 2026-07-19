// ===============================
// MOBILE MENU
// ===============================

const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ===============================
// STICKY NAVBAR
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
    } else {
        header.style.boxShadow = "none";
    }

});

// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .about, .skills, .projects, .contact"
);

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all .8s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "25px";
topButton.style.right = "25px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#ff2d55";
topButton.style.color = "#fff";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.zIndex = "999";
topButton.style.boxShadow = "0 0 20px rgba(255,45,85,.5)";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(
            this.clientWidth,
            this.clientHeight
        );

        circle.style.width = circle.style.height = diameter + "px";
        circle.style.left = e.offsetX - diameter / 2 + "px";
        circle.style.top = e.offsetY - diameter / 2 + "px";

        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.background = "rgba(255,255,255,.3)";
        circle.style.transform = "scale(0)";
        circle.style.animation = "ripple .6s linear";
        circle.style.pointerEvents = "none";

        this.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);

    });

});