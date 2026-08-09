/* =========================================================
   PLAYCONNECT - FILTER.JS
   Tournament / Player / Match Filtering
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       FIND FILTER CONTROLS
       ===================================================== */

    const filterContainers =
        document.querySelectorAll(
            ".filter-container, " +
            ".tournament-filter, " +
            ".filters"
        );


    filterContainers.forEach(function (container) {

        const selects =
            container.querySelectorAll(
                "select"
            );

        const filterButton =
            container.querySelector(
                ".primary-btn, " +
                ".filter-btn, " +
                ".apply-filter"
            );


        /* =================================================
           FILTER BUTTON
           ================================================= */

        if (filterButton) {

            filterButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    applyFilters(
                        container
                    );

                }
            );

        }


        /* =================================================
           LIVE FILTER
           ================================================= */

        selects.forEach(function (select) {

            select.addEventListener(
                "change",
                function () {

                    applyFilters(
                        container
                    );

                }
            );

        });

    });


    /* =====================================================
       APPLY FILTERS
       ===================================================== */

    function applyFilters(container) {

        const selects =
            container.querySelectorAll(
                "select"
            );


        const filterValues = [];


        selects.forEach(function (select) {

            filterValues.push(
                select.value
                    .trim()
                    .toLowerCase()
            );

        });


        const searchInput =
            container.querySelector(
                "input"
            );


        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        /* =================================================
           TOURNAMENT FILTER
           ================================================= */

        const tournamentCards =
            document.querySelectorAll(
                ".tournament-card"
            );


        if (
            tournamentCards.length > 0
        ) {

            filterTournamentCards(
                tournamentCards,
                filterValues,
                searchValue
            );

        }


        /* =================================================
           PLAYER FILTER
           ================================================= */

        const playerCards =
            document.querySelectorAll(
                ".player-card"
            );


        if (
            playerCards.length > 0
        ) {

            filterPlayerCards(
                playerCards,
                filterValues,
                searchValue
            );

        }


        /* =================================================
           MATCH FILTER
           ================================================= */

        const matchCards =
            document.querySelectorAll(
                ".match-card"
            );


        if (
            matchCards.length > 0
        ) {

            filterMatchCards(
                matchCards,
                filterValues,
                searchValue
            );

        }

    }


    /* =====================================================
       TOURNAMENT FILTER
       ===================================================== */

    function filterTournamentCards(
        cards,
        filterValues,
        searchValue
    ) {

        let visibleCount = 0;


        cards.forEach(function (card) {

            const cardText =
                card.textContent
                    .trim()
                    .toLowerCase();


            const sportTag =
                card.querySelector(
                    ".sport-tag"
                );


            const sport =
                sportTag
                    ? sportTag.textContent
                        .trim()
                        .toLowerCase()
                    : "";


            const matchesSearch =
                !searchValue ||
                cardText.includes(
                    searchValue
                );


            let matchesSport =
                true;


            let matchesCity =
                true;


            /* ---------------------------------------------
               Sport Filter
            --------------------------------------------- */

            if (
                filterValues.length >= 1 &&
                filterValues[0] &&
                filterValues[0] !== "all sports"
            ) {

                matchesSport =
                    sport ===
                    filterValues[0];

            }


            /* ---------------------------------------------
               City Filter
            --------------------------------------------- */

            if (
                filterValues.length >= 2 &&
                filterValues[1] &&
                filterValues[1] !== "all cities"
            ) {

                matchesCity =
                    cardText.includes(
                        filterValues[1]
                    );

            }


            if (
                matchesSearch &&
                matchesSport &&
                matchesCity
            ) {

                card.style.display =
                    "";

                visibleCount++;

            }

            else {

                card.style.display =
                    "none";

            }

        });


        showFilterResult(
            ".tournament-grid",
            visibleCount
        );

    }


    /* =====================================================
       PLAYER FILTER
       ===================================================== */

    function filterPlayerCards(
        cards,
        filterValues,
        searchValue
    ) {

        let visibleCount = 0;


        cards.forEach(function (card) {

            const text =
                card.textContent
                    .trim()
                    .toLowerCase();


            let matchesSearch =
                !searchValue ||
                text.includes(
                    searchValue
                );


            let matchesFilters =
                true;


            filterValues.forEach(
                function (value) {

                    if (
                        value &&
                        value !== "all" &&
                        value !== "all players" &&
                        value !== "all sports" &&
                        value !== "all cities"
                    ) {

                        if (
                            !text.includes(
                                value
                            )
                        ) {

                            matchesFilters =
                                false;

                        }

                    }

                }
            );


            if (
                matchesSearch &&
                matchesFilters
            ) {

                card.style.display =
                    "";

                visibleCount++;

            }

            else {

                card.style.display =
                    "none";

            }

        });


        showFilterResult(
            ".players-grid",
            visibleCount
        );

    }


    /* =====================================================
       MATCH FILTER
       ===================================================== */

    function filterMatchCards(
        cards,
        filterValues,
        searchValue
    ) {

        let visibleCount = 0;


        cards.forEach(function (card) {

            const text =
                card.textContent
                    .trim()
                    .toLowerCase();


            let matchesSearch =
                !searchValue ||
                text.includes(
                    searchValue
                );


            let matchesFilters =
                true;


            filterValues.forEach(
                function (value) {

                    if (
                        value &&
                        value !== "all" &&
                        value !== "all sports" &&
                        value !== "all cities"
                    ) {

                        if (
                            !text.includes(
                                value
                            )
                        ) {

                            matchesFilters =
                                false;

                        }

                    }

                }
            );


            if (
                matchesSearch &&
                matchesFilters
            ) {

                card.style.display =
                    "";

                visibleCount++;

            }

            else {

                card.style.display =
                    "none";

            }

        });


        showFilterResult(
            ".match-grid",
            visibleCount
        );

    }


    /* =====================================================
       NO RESULT MESSAGE
       ===================================================== */

    function showFilterResult(
        containerSelector,
        count
    ) {

        const container =
            document.querySelector(
                containerSelector
            );


        if (!container) {
            return;
        }


        let message =
            container.parentElement
                .querySelector(
                    ".filter-no-results"
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
                    "filter-no-results";

                message.innerHTML = `
                    <div class="filter-empty-icon">
                        <i class="fa-solid fa-filter-circle-xmark"></i>
                    </div>

                    <h3>No matching results</h3>

                    <p>
                        Try changing your filters
                        or search for something else.
                    </p>
                `;


                container.parentElement
                    .appendChild(
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
       RESET FILTERS
       ===================================================== */

    const resetButtons =
        document.querySelectorAll(
            ".reset-filter, " +
            ".clear-filter, " +
            ".reset-filters"
        );


    resetButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const container =
                        button.closest(
                            ".filter-container, " +
                            ".tournament-filter, " +
                            ".filters"
                        );


                    if (!container) {
                        return;
                    }


                    /* Reset selects */

                    const selects =
                        container.querySelectorAll(
                            "select"
                        );


                    selects.forEach(
                        function (select) {

                            select.selectedIndex =
                                0;

                        }
                    );


                    /* Reset search */

                    const input =
                        container.querySelector(
                            "input"
                        );


                    if (input) {

                        input.value =
                            "";

                    }


                    /* Show all cards */

                    const cards =
                        document.querySelectorAll(
                            ".tournament-card, " +
                            ".player-card, " +
                            ".match-card"
                        );


                    cards.forEach(
                        function (card) {

                            card.style.display =
                                "";

                        }
                    );


                    /* Hide messages */

                    const messages =
                        document.querySelectorAll(
                            ".filter-no-results, " +
                            ".search-no-results"
                        );


                    messages.forEach(
                        function (message) {

                            message.style.display =
                                "none";

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(
        function (category) {

            category.addEventListener(
                "click",
                function () {

                    const title =
                        category.querySelector(
                            "h4"
                        );


                    if (!title) {
                        return;
                    }


                    const categoryName =
                        title.textContent
                            .trim()
                            .toLowerCase();


                    const tournamentFilter =
                        document.querySelector(
                            ".tournament-filter"
                        );


                    if (!tournamentFilter) {
                        return;
                    }


                    const sportSelect =
                        tournamentFilter
                            .querySelector(
                                "select"
                            );


                    if (!sportSelect) {
                        return;
                    }


                    const options =
                        Array.from(
                            sportSelect.options
                        );


                    const matchingOption =
                        options.find(
                            function (option) {

                                return (
                                    option.text
                                        .trim()
                                        .toLowerCase() ===
                                    categoryName
                                );

                            }
                        );


                    if (matchingOption) {

                        sportSelect.value =
                            matchingOption.value;


                        sportSelect.dispatchEvent(
                            new Event(
                                "change"
                            )
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       INITIAL FILTER CHECK
       ===================================================== */

    filterContainers.forEach(
        function (container) {

            const selects =
                container.querySelectorAll(
                    "select"
                );


            let hasSelectedFilter =
                false;


            selects.forEach(
                function (select) {

                    if (
                        select.selectedIndex >
                        0
                    ) {

                        hasSelectedFilter =
                            true;

                    }

                }
            );


            if (hasSelectedFilter) {

                applyFilters(
                    container
                );

            }

        }
    );

});