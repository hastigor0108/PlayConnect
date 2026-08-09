document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PLAYCONNECT - TOURNAMENTS.JS
       Search, Filter, Registration & Tournament Interactions
       ===================================================== */


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const searchInput =
        document.querySelector(
            ".tournament-filter input"
        );

    const sportFilter =
        document.querySelectorAll(
            ".tournament-filter select"
        )[0];

    const cityFilter =
        document.querySelectorAll(
            ".tournament-filter select"
        )[1];

    const searchButton =
        document.querySelector(
            ".tournament-filter .primary-btn"
        );

    const tournamentCards =
        document.querySelectorAll(
            ".tournament-card"
        );


    /* =====================================================
       SEARCH & FILTER
       ===================================================== */

    function filterTournaments() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        const selectedSport =
            sportFilter
                ? sportFilter.value
                    .toLowerCase()
                : "all sports";

        const selectedCity =
            cityFilter
                ? cityFilter.value
                    .toLowerCase()
                : "all cities";


        let visibleCount = 0;


        tournamentCards.forEach(
            function (card) {

                const cardText =
                    card.textContent
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

                const listItems =
                    card.querySelectorAll(
                        "li"
                    );

                let city = "";

                listItems.forEach(
                    function (item) {

                        const text =
                            item.textContent
                                .toLowerCase();

                        if (
                            text.includes("surat") ||
                            text.includes("rajkot") ||
                            text.includes("ahmedabad") ||
                            text.includes("bhuj") ||
                            text.includes("vadodara") ||
                            text.includes("gandhinagar") ||
                            text.includes("jamnagar")
                        ) {

                            city =
                                text;

                        }

                    }
                );


                const matchesSearch =
                    !searchValue ||
                    cardText.includes(
                        searchValue
                    );


                const matchesSport =
                    selectedSport ===
                        "all sports" ||
                    sport ===
                        selectedSport;


                const matchesCity =
                    selectedCity ===
                        "all cities" ||
                    city.includes(
                        selectedCity
                    );


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

            }
        );


        showNoResultsMessage(
            visibleCount
        );

    }


    /* =====================================================
       SEARCH BUTTON
       ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                filterTournaments();

                const upcoming =
                    document.getElementById(
                        "upcoming-tournaments"
                    );

                if (upcoming) {

                    upcoming.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       LIVE SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterTournaments();

            }
        );

    }


    /* =====================================================
       SPORT FILTER
       ===================================================== */

    if (sportFilter) {

        sportFilter.addEventListener(
            "change",
            function () {

                filterTournaments();

            }
        );

    }


    /* =====================================================
       CITY FILTER
       ===================================================== */

    if (cityFilter) {

        cityFilter.addEventListener(
            "change",
            function () {

                filterTournaments();

            }
        );

    }


    /* =====================================================
       NO RESULTS MESSAGE
       ===================================================== */

    function showNoResultsMessage(
        count
    ) {

        const grid =
            document.querySelector(
                ".tournament-grid"
            );

        if (!grid) {
            return;
        }


        let message =
            document.querySelector(
                ".no-tournament-results"
            );


        if (count === 0) {

            if (!message) {

                message =
                    document.createElement(
                        "div"
                    );

                message.className =
                    "no-tournament-results";

                message.innerHTML = `
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No tournaments found</h3>
                    <p>
                        Try changing your search or filter options.
                    </p>
                `;

                grid.appendChild(
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
       REGISTER BUTTONS
       ===================================================== */

    const registerButtons =
        document.querySelectorAll(
            ".tournament-card .primary-btn, " +
            ".featured-content .primary-btn"
        );


    registerButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    let tournamentName =
                        "Tournament";


                    const card =
                        button.closest(
                            ".tournament-card, " +
                            ".featured-card"
                        );


                    if (card) {

                        const title =
                            card.querySelector(
                                "h3, h2"
                            );

                        if (title) {

                            tournamentName =
                                title.textContent
                                    .trim();

                        }

                    }


                    registerForTournament(
                        tournamentName
                    );

                }
            );

        }
    );


    /* =====================================================
       TOURNAMENT REGISTRATION
       ===================================================== */

    function registerForTournament(
        tournamentName
    ) {

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "playconnect_current_user"
                )
            );


        if (!currentUser) {

            showTournamentNotification(
                "Please login or create an account before registering.",
                "warning"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1500
            );

            return;

        }


        let registrations =
            JSON.parse(
                localStorage.getItem(
                    "playconnect_tournament_registrations"
                )
            ) || [];


        const alreadyRegistered =
            registrations.some(
                function (registration) {

                    return (
                        registration.email ===
                            currentUser.email &&
                        registration.tournament ===
                            tournamentName
                    );

                }
            );


        if (alreadyRegistered) {

            showTournamentNotification(
                "You are already registered for this tournament.",
                "info"
            );

            return;

        }


        const registration = {

            id:
                Date.now(),

            tournament:
                tournamentName,

            email:
                currentUser.email,

            player:
                currentUser.name ||
                (
                    currentUser.firstName +
                    " " +
                    currentUser.lastName
                ),

            registeredAt:
                new Date().toISOString()

        };


        registrations.push(
            registration
        );


        localStorage.setItem(
            "playconnect_tournament_registrations",
            JSON.stringify(
                registrations
            )
        );


        showTournamentNotification(
            `Successfully registered for ${tournamentName}!`,
            "success"
        );


        updateRegistrationCount();

    }


    /* =====================================================
       REGISTRATION COUNT
       ===================================================== */

    function updateRegistrationCount() {

        const registrationCards =
            document.querySelectorAll(
                ".status-card"
            );


        if (
            registrationCards.length <
            4
        ) {

            return;

        }


        let registrations =
            JSON.parse(
                localStorage.getItem(
                    "playconnect_tournament_registrations"
                )
            ) || [];


        const registeredElement =
            registrationCards[1]
                .querySelector("h3");


        if (registeredElement) {

            const baseRegistered =
                368;

            const totalRegistered =
                baseRegistered +
                registrations.length;

            registeredElement.textContent =
                totalRegistered;

        }

    }


    /* =====================================================
       TOURNAMENT NOTIFICATION
       ===================================================== */

    function showTournamentNotification(
        message,
        type = "success"
    ) {

        let notification =
            document.querySelector(
                ".tournament-notification"
            );


        if (!notification) {

            notification =
                document.createElement(
                    "div"
                );

            notification.className =
                "tournament-notification";


            document.body.appendChild(
                notification
            );

        }


        notification.textContent =
            message;


        notification.className =
            `tournament-notification ${type}`;


        notification.style.display =
            "block";


        clearTimeout(
            notification.hideTimer
        );


        notification.hideTimer =
            setTimeout(
                function () {

                    notification.style.display =
                        "none";

                },
                3500
            );

    }


    /* =====================================================
       CATEGORY CARDS
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

                    const heading =
                        category.querySelector(
                            "h4"
                        );


                    if (!heading) {
                        return;
                    }


                    const categoryName =
                        heading.textContent
                            .trim();


                    if (
                        categoryName
                            .toLowerCase()
                            .includes("more")
                    ) {

                        showTournamentNotification(
                            "More sports categories coming soon!",
                            "info"
                        );

                        return;

                    }


                    if (sportFilter) {

                        const options =
                            Array.from(
                                sportFilter.options
                            );


                        const matchingOption =
                            options.find(
                                function (option) {

                                    return (
                                        option.text
                                            .toLowerCase() ===
                                        categoryName
                                            .toLowerCase()
                                    );

                                }
                            );


                        if (matchingOption) {

                            sportFilter.value =
                                matchingOption.value;

                            filterTournaments();

                        }

                    }


                    const upcoming =
                        document.getElementById(
                            "upcoming-tournaments"
                        );


                    if (upcoming) {

                        upcoming.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       REGISTERED TEAMS HOVER EFFECT
       ===================================================== */

    const teamCards =
        document.querySelectorAll(
            ".team-card"
        );


    teamCards.forEach(
        function (team) {

            team.addEventListener(
                "click",
                function () {

                    const teamName =
                        team.querySelector(
                            "h3"
                        );


                    if (teamName) {

                        showTournamentNotification(
                            `${teamName.textContent.trim()} is participating in the tournament.`,
                            "info"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateRegistrationCount();

});