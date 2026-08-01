const roles = [
    "Video Editor",
    "Motion Graphics Designer",
    "Community Manager"
];

let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typingElement = document.getElementById("typing");

function type() {

    const fullText = roles[roleIndex];

    if (!isDeleting) {
        currentText = fullText.substring(0, charIndex++);
    } else {
        currentText = fullText.substring(0, charIndex--);
    }

    typingElement.textContent = currentText;

    let speed = 100;

    if (isDeleting) speed = 50;

    if (!isDeleting && currentText === fullText) {

        speed = 1500;
        isDeleting = true;

    } else if (isDeleting && currentText === "") {

        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;

    }

    setTimeout(type, speed);
}

type();
// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const sectionTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if(sectionTop < windowHeight - revealPoint){

            section.classList.add("active");

        }

    });

}
// ================= ANIMATED COUNTERS =================

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    const statsSection = document.querySelector(".stats");

    const sectionTop = statsSection.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter=>{

            const target = +counter.getAttribute("data-target");

            let count = 0;

            const increment = target / 60;

            const updateCounter = ()=>{

                count += increment;

                if(count < target){

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);
// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
// Run once in case the stats are already visible
startCounters();
window.addEventListener("scroll", revealOnScroll);

// Run once when the page loads
revealOnScroll();
// ================= EMAILJS =================

emailjs.init("r3e_-x5MwGculOSzN");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.sendForm(
        "service_q0qdkmn",
        "template_0jvmtt3",
        this
    )

    .then(function () {

        alert("✅ Message sent successfully!");

        contactForm.reset();

    })

    .catch(function (error) {

        alert("❌ Failed to send message.");

        console.log(error);

    });

});