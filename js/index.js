// ********** CAROUSEL ************

const prevButton = document.getElementById('carousel-left');
const nextButton = document.getElementById('carousel-right');
const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
const carouselTestimonials = document.querySelectorAll('.testimonial');

// get the width of the carousel wrapper
let carouselWidth = 0;

// set current position of carousel
let pos = 0;

// current slide
let slide = 0;

// get width of one testimonial
let testimonialWidth = 0;

const isActive = (elem) => {
    return elem.classList.contains('active')
}

const moveWrapper = () => {
    carouselWrapper.style.left = `${pos}px`;

    if (slide === 0) {
        prevButton.classList.remove('active');
    }
    else if (slide === carouselTestimonials.length - 1) {
        nextButton.classList.remove('active');
    }
};

prevButton.addEventListener('click', function () {
    // if previous button is active, then it can be pressed
    if (isActive(this)) {
        pos += testimonialWidth;
        slide--;
        moveWrapper();

        if (!nextButton.classList.contains('active')) {
            nextButton.classList.add('active');
        }
    }
});

nextButton.addEventListener('click', function () {
    // if next button is active, then it can be pressed
    if (isActive(this)) {
        pos -= testimonialWidth;
        slide++;
        moveWrapper();
        if (!prevButton.classList.contains('active')) {
            prevButton.classList.add('active');
        }
    }

    prevButton.classList.add('active');
});

// ******** STATS ********
const countries_max = 56;
const branches_max = 122;
const sales_max = 1000000;

const p_countries = document.getElementById('stats-countries');
const p_branches = document.getElementById('stats-branches');
const p_sales = document.getElementById('stats-sales');

const stats_container = document.querySelector('.stats__container-numbers');

let scrolled = false;
let timerActive = false;

const stats_details = document.querySelectorAll('.stats-animate');

const elemVisible = (elem, divisor) => {
    const elemTop = elem.getBoundingClientRect().top;

    return (
        elemTop <= (window.innerHeight || document.documentElement.clientHeight) / divisor
    );
};

let current_countries = 0;
let current_branches = 0;
let current_sales = 0;

const countries_rate = countries_max / 50;
const branches_rate = branches_max / 50;
const sales_rate = sales_max / 50;

const startTimer = () => {
    const timer = setInterval(() => {

        if (current_countries < countries_max) {
            current_countries += countries_rate;
            current_branches += branches_rate;
            current_sales += sales_rate;

            p_countries.textContent = parseInt(current_countries);
            p_branches.textContent = parseInt(current_branches);
            p_sales.textContent = parseInt(current_sales);
        }
        else {
            p_countries.textContent = countries_max;
            p_branches.textContent = "122+";
            p_sales.textContent = "1M+";

            clearInterval(timer);
        }
    }, 50);
};

const handleScrollAnimation = () => {
    stats_details.forEach((el) => {
        if (elemVisible(el, 1.35)) {
            // active timer for each
            if (!timerActive) {
                timerActive = true;
                startTimer();
            }
        }
    });
}

window.addEventListener('scroll', () => {
    scrolled = true;

    handleScrollAnimation();

});

setInterval(() => {
    if (scrolled) {
        scrolled = false;
    }
}, 100);

const reportWindowSize = () => {
    carouselWidth = carouselWrapper.offsetWidth;
    testimonialWidth = carouselWidth / carouselTestimonials.length;
};

window.onresize = reportWindowSize;

reportWindowSize();