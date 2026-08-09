/* =========================================================
   PLAYCONNECT - APP.JS
   Common JavaScript for all pages
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOADER
       ===================================================== */

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", function () {

            loader.classList.add("hidden");

            setTimeout(function () {
                loader.style.display = "none";
            }, 500);

        });
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function () {

            navbar.classList.toggle("active");
            menuBtn.classList.toggle("active");

        });


        /* Close menu when clicking a link */

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");
                menuBtn.classList.remove("active");

            });

        });

    }


    /* =====================================================
       SCROLL PROGRESS BAR
       ===================================================== */

    const progressBar = document.getElementById("progressBar");

    function updateProgressBar() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (documentHeight <= 0) {
            progressBar.style.width = "0%";
            return;
        }

        const scrollPercentage =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            scrollPercentage + "%";

    }

    window.addEventListener("scroll", updateProgressBar);

    updateProgressBar();


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop();

    const allNavLinks =
        document.querySelectorAll("nav a");

    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (
            linkPage &&
            linkPage !== "#" &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const smoothLinks =
        document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       BUTTON CLICK ANIMATION
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, .login-btn, .signup-btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.add("clicked");

            setTimeout(function () {

                button.classList.remove("clicked");

            }, 200);

        });

    });

});


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener("visibilitychange", function () {

    if (document.visibilityState === "visible") {

        document.body.classList.remove("page-hidden");

    }

});


/* =========================================================
   PREVENT BROKEN IMAGE ICONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const images =
        document.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("error", function () {

            img.classList.add("image-error");

        });

    });

});