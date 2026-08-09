document.addEventListener("DOMContentLoaded", () => {

    console.log("PlayConnect About JS loaded.");

    /* =====================================================
       LOADER
       ===================================================== */

    const loader =
        document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("hide");

                setTimeout(() => {

                    loader.style.display =
                        "none";

                }, 500);

            }, 500);

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-card, " +
            ".feature-card, " +
            ".team-card, " +
            ".value-card, " +
            ".testimonial-card, " +
            ".stat-card, " +
            ".timeline-item, " +
            ".about-content, " +
            ".about-image"
        );


    if (revealElements.length > 0) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       ANIMATED COUNTERS
       ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter, " +
            ".stat-number, " +
            "[data-target]"
        );


    function animateCounter(element) {

        const target =
            Number(
                element.dataset.target ||
                element.textContent
                    .replace(/[^0-9.]/g, "")
            );


        if (
            isNaN(target) ||
            target <= 0
        ) {

            return;

        }


        const suffix =
            element.dataset.suffix ||
            (
                element.textContent
                    .includes("+")
                    ? "+"
                    : ""
            );


        const duration =
            1800;

        const startTime =
            performance.now();


        function updateCounter(
            currentTime
        ) {

            const progress =
                Math.min(
                    (
                        currentTime -
                        startTime
                    ) / duration,
                    1
                );


            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easedProgress *
                    target
                );


            element.textContent =
                currentValue +
                suffix;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    target + suffix;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if (counters.length > 0) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(
            counter => {

                counterObserver.observe(
                    counter
                );

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(
        item => {

            const question =
                item.querySelector(
                    "h3, h4, .faq-question"
                );

            const answer =
                item.querySelector(
                    "p, .faq-answer"
                );


            if (
                !question ||
                !answer
            ) {

                return;

            }


            answer.style.maxHeight =
                "0px";

            answer.style.overflow =
                "hidden";

            answer.style.transition =
                "max-height 0.35s ease";


            question.style.cursor =
                "pointer";


            question.addEventListener(
                "click",
                () => {

                    const isOpen =
                        item.classList.contains(
                            "active"
                        );


                    /* Close all */

                    faqItems.forEach(
                        otherItem => {

                            otherItem.classList.remove(
                                "active"
                            );

                            const otherAnswer =
                                otherItem.querySelector(
                                    "p, .faq-answer"
                                );

                            if (
                                otherAnswer
                            ) {

                                otherAnswer.style.maxHeight =
                                    "0px";

                            }

                        }
                    );


                    /* Open selected */

                    if (!isOpen) {

                        item.classList.add(
                            "active"
                        );

                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }
            );

        }
    );


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );

    const navbar =
        document.getElementById(
            "navbar"
        );


    if (
        menuBtn &&
        navbar
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                navbar.classList.toggle(
                    "active"
                );

                menuBtn.classList.toggle(
                    "active"
                );

            }
        );


        const navLinks =
            navbar.querySelectorAll(
                "a"
            );


        navLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navbar.classList.remove(
                            "active"
                        );

                        menuBtn.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY >
                    400
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll(
            "#navbar a"
        );


    navLinks.forEach(
        link => {

            const linkPage =
                link
                    .getAttribute("href")
                    ?.split("/")
                    .pop();


            if (
                linkPage ===
                currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, " +
            ".secondary-btn, " +
            ".cta-btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function(event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.classList.add(
                        "button-ripple"
                    );


                    const rect =
                        button.getBoundingClientRect();


                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left
                        ) + "px";


                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top
                        ) + "px";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                    console.warn(
                        "Image not found:",
                        image.src
                    );

                }
            );

        }
    );


    /* =====================================================
       SCROLL PROGRESS BAR
       ===================================================== */

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (progressBar) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollTop =
                    window.scrollY;


                const documentHeight =
                    document.documentElement
                        .scrollHeight -
                    window.innerHeight;


                if (
                    documentHeight <= 0
                ) {

                    return;

                }


                const progress =
                    (
                        scrollTop /
                        documentHeight
                    ) * 100;


                progressBar.style.width =
                    progress + "%";

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );


    console.log(
        "About page initialized successfully."
    );

});