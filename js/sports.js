/* =========================================================
   PLAYCONNECT - SPORTS PAGE JAVASCRIPT
   File: js/sports.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchInput = document.querySelector(
        ".sports-search input, #sportSearch, input[placeholder*='Search']"
    );

    const sportFilter = document.querySelector(
        "#sportFilter, .sport-filter select"
    );

    const sportsGrid = document.querySelector(
        ".sports-grid, .sports-list, .sport-grid"
    );

    const sportCards = document.querySelectorAll(
        ".sport-card, .sports-card"
    );


    /* =====================================================
       SEARCH SPORTS
    ===================================================== */

    function filterSports() {

        const searchValue = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedSport = sportFilter
            ? sportFilter.value.toLowerCase().trim()
            : "all";


        sportCards.forEach(card => {

            const cardText = card.textContent.toLowerCase();

            const sportName =
                card.dataset.sport
                    ? card.dataset.sport.toLowerCase()
                    : cardText;

            const matchesSearch =
                searchValue === "" ||
                cardText.includes(searchValue);

            const matchesFilter =
                selectedSport === "" ||
                selectedSport === "all" ||
                sportName.includes(selectedSport);


            if (matchesSearch && matchesFilter) {

                card.style.display = "";

                requestAnimationFrame(() => {
                    card.classList.add("show");
                });

            } else {

                card.classList.remove("show");
                card.style.display = "none";

            }

        });

        updateNoResultsMessage();

    }


    /* =====================================================
       SEARCH INPUT EVENT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", filterSports);

    }


    /* =====================================================
       SPORT FILTER EVENT
    ===================================================== */

    if (sportFilter) {

        sportFilter.addEventListener("change", filterSports);

    }


    /* =====================================================
       NO RESULTS MESSAGE
    ===================================================== */

    function updateNoResultsMessage() {

        if (!sportsGrid) return;

        const visibleCards = Array.from(sportCards)
            .filter(card => card.style.display !== "none");

        let noResults = sportsGrid.querySelector(".no-sports-result");

        if (visibleCards.length === 0) {

            if (!noResults) {

                noResults = document.createElement("div");

                noResults.className = "no-sports-result";

                noResults.innerHTML = `
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No Sports Found</h3>
                    <p>Try searching for another sport.</p>
                `;

                sportsGrid.appendChild(noResults);

            }

        } else {

            if (noResults) {
                noResults.remove();
            }

        }

    }


    /* =====================================================
       SPORT CARD CLICK
    ===================================================== */

    sportCards.forEach(card => {

        card.addEventListener("click", event => {

            /*
             * If the card already contains a link or button,
             * don't override its normal behavior.
             */

            const clickedLink =
                event.target.closest("a, button");

            if (clickedLink) return;


            const sportName =
                card.dataset.sport ||
                card.querySelector("h3, h2, h4")?.textContent ||
                "Sport";


            const cleanName = sportName.trim();

            localStorage.setItem(
                "selectedSport",
                cleanName
            );


            /*
             * If sports-details.html exists, you can enable
             * the following redirect.
             *
             * Otherwise the selection is simply stored.
             */

            // window.location.href =
            //     "sports-details.html?sport=" +
            //     encodeURIComponent(cleanName);

        });

    });


    /* =====================================================
       PLAY / JOIN BUTTONS
    ===================================================== */

    const actionButtons = document.querySelectorAll(
        ".sport-card .primary-btn, " +
        ".sport-card .secondary-btn, " +
        ".sport-card button, " +
        ".sports-card .primary-btn, " +
        ".sports-card button"
    );


    actionButtons.forEach(button => {

        button.addEventListener("click", event => {

            const card = button.closest(
                ".sport-card, .sports-card"
            );

            if (!card) return;


            const sportName =
                card.dataset.sport ||
                card.querySelector("h3, h2, h4")?.textContent ||
                "Sport";


            localStorage.setItem(
                "selectedSport",
                sportName.trim()
            );

        });

    });


    /* =====================================================
       RESET SEARCH
    ===================================================== */

    const resetButton = document.querySelector(
        ".reset-sports, #resetSports"
    );


    if (resetButton) {

        resetButton.addEventListener("click", () => {

            if (searchInput) {
                searchInput.value = "";
            }

            if (sportFilter) {
                sportFilter.value = "all";
            }

            sportCards.forEach(card => {

                card.style.display = "";

                requestAnimationFrame(() => {
                    card.classList.add("show");
                });

            });

            updateNoResultsMessage();

        });

    }


    /* =====================================================
       SPORT CARD ANIMATION
    ===================================================== */

    sportCards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * 0.08}s`;

        card.classList.add("show");

    });


    /* =====================================================
       LOAD SELECTED SPORT
    ===================================================== */

    const selectedSport =
        localStorage.getItem("selectedSport");


    if (selectedSport && searchInput) {

        /*
         * Don't automatically filter the page when loading,
         * because the user may simply have visited another page.
         *
         * The value is only available for other functionality.
         */

        searchInput.dataset.selectedSport =
            selectedSport;

    }


    /* =====================================================
       SMOOTH SCROLL FOR SPORT LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

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
       CONSOLE CHECK
    ===================================================== */

    console.log(
        "PlayConnect Sports JS loaded successfully."
    );

});