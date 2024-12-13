document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.slide-in');
    let lastScrollTop = 0; // To track scroll direction

    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    cards.forEach(card => {
        observer.observe(card);
    });

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolling down
            cards.forEach(card => {
                card.classList.remove('slide-back');
                card.classList.add('slide-in');
            });
        } else {
            // Scrolling up
            cards.forEach(card => {
                card.classList.remove('slide-in');
                card.classList.add('slide-back');
                // Reset animation by removing and adding the class again
                setTimeout(() => {
                    card.classList.remove('slide-back');
                    card.classList.add('slide-in');
                }, 500); // 500ms to match the transition time
            });
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
    });
});
