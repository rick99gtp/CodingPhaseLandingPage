const prevButton = document.getElementById('carousel-left');
const nextButton = document.getElementById('carousel-right');
const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
const carouselTestimonials = document.querySelectorAll('.testimonial');

// get the width of the carousel wrapper
const carouselWidth = carouselWrapper.offsetWidth;

// set current position of carousel
let pos = 0;

// current slide
let slide = 0;

// get width of one testimonial
const testimonialWidth = carouselWidth / carouselTestimonials.length;

const isActive = (elem) => {
    return elem.classList.contains('active')
}

const moveWrapper = () => {
    carouselWrapper.style.left = `${pos}px`;

    if(slide === 0) {
        prevButton.classList.remove('active');
    }
    else if(slide === carouselTestimonials.length - 1) {
        nextButton.classList.remove('active');
    }
};

prevButton.addEventListener('click', function() {
    // if previous button is active, then it can be pressed
    if(isActive(this)) {
        pos += testimonialWidth;
        slide--;
        moveWrapper();

        if(!nextButton.classList.contains('active')) {
            nextButton.classList.add('active');
        }
    }
});

nextButton.addEventListener('click', function() {
    // if next button is active, then it can be pressed
    if(isActive(this)) {
        pos -= testimonialWidth;
        slide++;
        moveWrapper();
        if(!prevButton.classList.contains('active')) {
            prevButton.classList.add('active');
        }
    }

    prevButton.classList.add('active');
});
