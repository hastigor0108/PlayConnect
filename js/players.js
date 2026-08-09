/* =========================================================
   PLAYCONNECT - PLAYERS.JS
   Player Search / Filter / Sort / Favorites
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const playerGrid =
        document.querySelector(".players-grid") ||
        document.querySelector(".player-grid");

    const searchInput =
        document.querySelector("#playerSearch") ||
        document.querySelector(".player-search input") ||
        document.querySelector(".search-box input");

    const sportFilter =
        document.querySelector("#sportFilter") ||
        document.querySelector(".sport-filter");

    const cityFilter =
        document.querySelector("#cityFilter") ||
        document.querySelector(".city-filter");

    const skillFilter =
        document.querySelector("#skillFilter") ||
        document.querySelector(".skill-filter");

    const sortFilter =
        document.querySelector("#sortPlayers") ||
        document.querySelector(".sort-filter");

    if (!playerGrid) {
        console.log("Players grid not found.");
        return;
    }

    /* =====================================================
       PLAYER CARDS
       ===================================================== */

    let playerCards = Array.from(
        playerGrid.querySelectorAll(
            ".player-card, .player-box, .player-item"
        )
    );

    /* =====================================================
       SEARCH
       ===================================================== */

    function getSearchValue() {
        return searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";
    }

    /* =====================================================
       FILTER VALUE HELPER
       ===================================================== */

    function getFilterValue(element) {

        if (!element) {
            return "all";
        }

        return element.value
            ? element.value.trim().toLowerCase()
            : "all";
    }

    /* =====================================================
       PLAYER DATA EXTRACTION
       ===================================================== */

    function getPlayerText(card) {
        return card.innerText.toLowerCase();
    }

    function getPlayerName(card) {

        const name =
            card.querySelector("h2") ||
            card.querySelector("h3") ||
            card.querySelector("h4") ||
            card.querySelector(".player-name");

        return name
            ? name.innerText.trim()
            : "";
    }

    /* =====================================================
       SEARCH + FILTER
       ===================================================== */

    function filterPlayers() {

        const search = getSearchValue();
        const sport = getFilterValue(sportFilter);
        const city = getFilterValue(cityFilter);
        const skill = getFilterValue(skillFilter);

        let visiblePlayers = [];

        playerCards.forEach(card => {

            const text = getPlayerText(card);

            const searchMatch =
                search === "" ||
                text.includes(search);

            const sportMatch =
                sport === "all" ||
                sport === "" ||
                text.includes(sport);

            const cityMatch =
                city === "all" ||
                city === "" ||
                text.includes(city);

            const skillMatch =
                skill === "all" ||
                skill === "" ||
                text.includes(skill);

            const show =
                searchMatch &&
                sportMatch &&
                cityMatch &&
                skillMatch;

            card.style.display = show ? "" : "none";

            if (show) {
                visiblePlayers.push(card);
            }
        });

        updateResultMessage(visiblePlayers.length);

        updatePlayerCount(visiblePlayers.length);
    }

    /* =====================================================
       RESULT MESSAGE
       ===================================================== */

    function updateResultMessage(count) {

        let message =
            document.querySelector(".no-player-message");

        if (count === 0) {

            if (!message) {

                message = document.createElement("div");

                message.className =
                    "no-player-message";

                message.innerHTML = `
                    <i class="fa-solid fa-user-slash"></i>
                    <h3>No Players Found</h3>
                    <p>
                        Try changing your search or filter options.
                    </p>
                `;

                playerGrid.appendChild(message);
            }

            message.style.display = "block";

        } else if (message) {

            message.style.display = "none";
        }
    }

    /* =====================================================
       PLAYER COUNT
       ===================================================== */

    function updatePlayerCount(count) {

        const countElements = document.querySelectorAll(
            ".player-count, #playerCount, .players-count"
        );

        countElements.forEach(element => {

            element.textContent =
                `${count} Player${count !== 1 ? "s" : ""}`;
        });
    }

    /* =====================================================
       SORT PLAYERS
       ===================================================== */

    function sortPlayers() {

        if (!sortFilter) {
            return;
        }

        const value =
            sortFilter.value.toLowerCase();

        const sortedCards = [...playerCards];

        if (value === "name-asc") {

            sortedCards.sort((a, b) =>
                getPlayerName(a).localeCompare(
                    getPlayerName(b)
                )
            );
        }

        else if (value === "name-desc") {

            sortedCards.sort((a, b) =>
                getPlayerName(b).localeCompare(
                    getPlayerName(a)
                )
            );
        }

        else if (value === "rating-high") {

            sortedCards.sort((a, b) =>
                getRating(b) - getRating(a)
            );
        }

        else if (value === "rating-low") {

            sortedCards.sort((a, b) =>
                getRating(a) - getRating(b)
            );
        }

        sortedCards.forEach(card => {
            playerGrid.appendChild(card);
        });

        playerCards = Array.from(
            playerGrid.querySelectorAll(
                ".player-card, .player-box, .player-item"
            )
        );

        filterPlayers();
    }

    /* =====================================================
       GET RATING
       ===================================================== */

    function getRating(card) {

        const ratingElement =
            card.querySelector(
                ".rating, .player-rating, [data-rating]"
            );

        if (!ratingElement) {
            return 0;
        }

        const ratingText =
            ratingElement.dataset.rating ||
            ratingElement.innerText;

        const match =
            ratingText.match(/[\d.]+/);

        return match
            ? parseFloat(match[0])
            : 0;
    }

    /* =====================================================
       FAVORITE PLAYER
       ===================================================== */

    function setupFavoriteButtons() {

        const buttons =
            playerGrid.querySelectorAll(
                ".favorite-btn, .fav-btn, .like-btn"
            );

        buttons.forEach(button => {

            const card =
                button.closest(
                    ".player-card, .player-box, .player-item"
                );

            if (!card) {
                return;
            }

            const playerName =
                getPlayerName(card);

            const storageKey =
                "playconnect_favorite_players";

            let favorites =
                JSON.parse(
                    localStorage.getItem(storageKey)
                ) || [];

            if (favorites.includes(playerName)) {

                button.classList.add("active");

                const icon =
                    button.querySelector("i");

                if (icon) {
                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );
                }
            }

            button.addEventListener("click", event => {

                event.preventDefault();
                event.stopPropagation();

                favorites =
                    JSON.parse(
                        localStorage.getItem(storageKey)
                    ) || [];

                if (favorites.includes(playerName)) {

                    favorites =
                        favorites.filter(
                            name =>
                                name !== playerName
                        );

                    button.classList.remove(
                        "active"
                    );

                } else {

                    favorites.push(playerName);

                    button.classList.add(
                        "active"
                    );
                }

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(favorites)
                );

                showFavoriteMessage(
                    favorites.includes(playerName)
                );
            });
        });
    }

    /* =====================================================
       FAVORITE MESSAGE
       ===================================================== */

    function showFavoriteMessage(isAdded) {

        let toast =
            document.querySelector(
                ".player-toast"
            );

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className =
                "player-toast";

            document.body.appendChild(toast);
        }

        toast.textContent =
            isAdded
                ? "Player added to favorites ❤️"
                : "Player removed from favorites";

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2000);
    }

    /* =====================================================
       VIEW PROFILE BUTTON
       ===================================================== */

    function setupProfileButtons() {

        const buttons =
            playerGrid.querySelectorAll(
                ".view-profile, .profile-btn, .player-profile-btn"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const card =
                        button.closest(
                            ".player-card, .player-box, .player-item"
                        );

                    if (!card) {
                        return;
                    }

                    const name =
                        getPlayerName(card);

                    localStorage.setItem(
                        "selectedPlayer",
                        name
                    );

                    /*
                     * If player-profile.html exists,
                     * change this link accordingly.
                     */

                    if (
                        button.tagName === "A" &&
                        button.getAttribute("href")
                    ) {
                        window.location.href =
                            button.getAttribute("href");
                    }

                    else {

                        alert(
                            `Opening profile of ${name}`
                        );
                    }
                }
            );
        });
    }

    /* =====================================================
       EVENT LISTENERS
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterPlayers
        );
    }

    if (sportFilter) {

        sportFilter.addEventListener(
            "change",
            filterPlayers
        );
    }

    if (cityFilter) {

        cityFilter.addEventListener(
            "change",
            filterPlayers
        );
    }

    if (skillFilter) {

        skillFilter.addEventListener(
            "change",
            filterPlayers
        );
    }

    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            sortPlayers
        );
    }

    /* =====================================================
       RESET FILTERS
       ===================================================== */

    const resetButton =
        document.querySelector(
            "#resetFilters, .reset-filters"
        );

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (sportFilter) {
                    sportFilter.value = "all";
                }

                if (cityFilter) {
                    cityFilter.value = "all";
                }

                if (skillFilter) {
                    skillFilter.value = "all";
                }

                if (sortFilter) {
                    sortFilter.value = "default";
                }

                playerCards.forEach(card => {
                    card.style.display = "";
                });

                updateResultMessage(
                    playerCards.length
                );

                updatePlayerCount(
                    playerCards.length
                );
            }
        );
    }

    /* =====================================================
       INITIALIZE
       ===================================================== */

    setupFavoriteButtons();

    setupProfileButtons();

    filterPlayers();

    console.log(
        "PlayConnect Players JS loaded successfully."
    );

});