document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button--right');
        const prevButton = document.querySelector('.carousel-button--left');
        const dotsNav = document.querySelector('.carousel-nav');
        if (dotsNav && slides.length > 0) {
            const dots = Array.from(dotsNav.children);

            const moveToIndex = (index) => {
                track.style.transform = `translateX(-${index * 100}%)`;
                
                const currentSlide = track.querySelector('.current-slide');
                if (currentSlide) currentSlide.classList.remove('current-slide');
                slides[index].classList.add('current-slide');
                
                const currentDot = dotsNav.querySelector('.current-indicator');
                if (currentDot) currentDot.classList.remove('current-indicator');
                dots[index].classList.add('current-indicator');
                
                if (index === 0) {
                    prevButton.classList.add('is-hidden');
                    nextButton.classList.remove('is-hidden');
                } else if (index === slides.length - 1) {
                    prevButton.classList.remove('is-hidden');
                    nextButton.classList.add('is-hidden');
                } else {
                    prevButton.classList.remove('is-hidden');
                    nextButton.classList.remove('is-hidden');
                }
            };

            let currentIndex = 0;

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    if (currentIndex < slides.length - 1) {
                        currentIndex++;
                        moveToIndex(currentIndex);
                    }
                });
            }

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        moveToIndex(currentIndex);
                    }
                });
            }

            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button');
                if (!targetDot) return;
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                if (targetIndex !== -1) {
                    currentIndex = targetIndex;
                    moveToIndex(currentIndex);
                }
            });
        }
    }

});
