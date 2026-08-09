document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PLAYCONNECT - SEARCH.JS
       Global Search Functionality
       ===================================================== */


    /* =====================================================
       SEARCH INPUTS
       ===================================================== */

    const searchInputs =
        document.querySelectorAll(
            'input[type="search"], ' +
            'input[placeholder*="Search"], ' +
            'input[placeholder*="search"]'
        );


    /* =====================================================
       SEARCH FUNCTION
       ===================================================== */

    searchInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                const searchValue =
                    input.value
                        .trim()
                        .toLowerCase();


                /*
                 * Find the closest section/container
                 * so search does not affect unrelated
                 * content on the page.
                 */

                const section =
                    input.closest(
                        "section, .search-container"
                    );


                if (!section) {
                    return;
                }


                /* Tournament cards */

                const tournamentCards =
                    section.querySelectorAll(
                        ".tournament-card"
                    );


                if (
                    tournamentCards.length > 0
                ) {

                    searchCards(
                        tournamentCards,
                        searchValue
                    );

                }


                /* Player cards */

                const playerCards =
                    section.querySelectorAll(
                        ".player-card"
                    );


                if (
                    playerCards.length > 0
                ) {

                    searchCards(
                        playerCards,
                        searchValue
                    );

                }


                /* Match cards */

                const matchCards =
                    section.querySelectorAll(
                        ".match-card"
                    );


                if (
                    matchCards.length > 0
                ) {

                    searchCards(
                        matchCards,
                        searchValue
                    );

                }

            }
        );


        /* =================================================
           ENTER KEY SEARCH
           ================================================= */

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    performSearch(
                        input.value.trim()
                    );

                }

            }
        );

    });


    /* =====================================================
       SEARCH CARDS
       ===================================================== */

    function searchCards(
        cards,
        searchValue
    ) {

        let visibleCards = 0;


        cards.forEach(
            function (card) {

                const cardText =
                    card.textContent
                        .toLowerCase();


                if (
                    !searchValue ||
                    cardText.includes(
                        searchValue
                    )
                ) {

                    card.style.display =
                        "";

                    visibleCards++;

                }

                else {

                    card.style.display =
                        "none";

                }

            }
        );


        showSearchMessage(
            cards,
            visibleCards
        );

    }


    /* =====================================================
       SEARCH BUTTONS
       ===================================================== */

    const searchButtons =
        document.querySelectorAll(
            ".search-btn, " +
            ".search-button, " +
            ".search-container button"
        );


    searchButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const container =
                        button.closest(
                            ".search-container, " +
                            ".filter-container"
                        );


                    if (!container) {
                        return;
                    }


                    const input =
                        container.querySelector(
                            "input"
                        );


                    if (!input) {
                        return;
                    }


                    performSearch(
                        input.value.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       PERFORM SEARCH
       ===================================================== */

    function performSearch(
        value
    ) {

        const searchValue =
            value.toLowerCase();


        const allCards =
            document.querySelectorAll(
                ".tournament-card, " +
                ".player-card, " +
                ".match-card"
            );


        let found = 0;


        allCards.forEach(
            function (card) {

                const text =
                    card.textContent
                        .toLowerCase();


                if (
                    !searchValue ||
                    text.includes(
                        searchValue
                    )
                ) {

                    card.style.display =
                        "";

                    found++;

                }

                else {

                    card.style.display =
                        "none";

                }

            }
        );


        showGlobalSearchMessage(
            found
        );

    }


    /* =====================================================
       NO RESULTS MESSAGE
       ===================================================== */

    function showSearchMessage(
        cards,
        count
    ) {

        const parent =
            cards[0]?.parentElement;


        if (!parent) {
            return;
        }


        let message =
            parent.querySelector(
                ".search-no-results"
            );


        if (
            count === 0
        ) {

            if (!message) {

                message =
                    document.createElement(
                        "div"
                    );

                message.className =
                    "search-no-results";

                message.innerHTML = `
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No results found</h3>
                    <p>
                        Try another search term.
                    </p>
                `;

                parent.appendChild(
                    message
                );

            }


            message.style.display =
                "block";

        }

        else {

            if (message) {

                message.style.display =
                    "none";

            }

        }

    }


    /* =====================================================
       GLOBAL SEARCH MESSAGE
       ===================================================== */

    function showGlobalSearchMessage(
        count
    ) {

        let message =
            document.querySelector(
                ".global-search-message"
            );


        if (
            count === 0
        ) {

            if (!message) {

                message =
                    document.createElement(
                        "div"
                    );

                message.className =
                    "global-search-message";

                message.innerHTML = `
                    <i class="fa-solid fa-circle-info"></i>
                    <span>No matching results found.</span>
                `;

                document.body.appendChild(
                    message
                );

            }


            message.style.display =
                "flex";

        }

        else {

            if (message) {

                message.style.display =
                    "none";

            }

        }

    }


    /* =====================================================
       CLEAR SEARCH
       ===================================================== */

    const clearButtons =
        document.querySelectorAll(
            ".clear-search"
        );


    clearButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const container =
                        button.closest(
                            ".search-container, " +
                            ".filter-container"
                        );


                    if (!container) {
                        return;
                    }


                    const input =
                        container.querySelector(
                            "input"
                        );


                    if (input) {

                        input.value = "";

                        input.dispatchEvent(
                            new Event("input")
                        );

                        input.focus();

                    }

                }
            );

        }
    );


});