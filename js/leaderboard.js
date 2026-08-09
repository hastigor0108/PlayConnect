document.addEventListener("DOMContentLoaded", () => {

    console.log("PlayConnect Leaderboard JS loaded.");

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const leaderboardBody =
        document.querySelector("#leaderboardBody") ||
        document.querySelector(".leaderboard-table tbody") ||
        document.querySelector("tbody");

    const searchInput =
        document.querySelector("#leaderboardSearch") ||
        document.querySelector(".leaderboard-search");

    const sportFilter =
        document.querySelector("#sportFilter") ||
        document.querySelector(".sport-filter");

    const sortSelect =
        document.querySelector("#sortLeaderboard") ||
        document.querySelector(".sort-leaderboard");


    /* =====================================================
       DEFAULT PLAYERS
       ===================================================== */

    const defaultPlayers = [

        {
            id: 1,
            name: "Rahul Patel",
            sport: "Cricket",
            matches: 156,
            wins: 121,
            points: 1840,
            rating: 4.9
        },

        {
            id: 2,
            name: "Aman Verma",
            sport: "Football",
            matches: 143,
            wins: 108,
            points: 1765,
            rating: 4.8
        },

        {
            id: 3,
            name: "Priya Shah",
            sport: "Badminton",
            matches: 138,
            wins: 104,
            points: 1690,
            rating: 4.8
        },

        {
            id: 4,
            name: "Rohan Mehta",
            sport: "Cricket",
            matches: 132,
            wins: 96,
            points: 1610,
            rating: 4.7
        },

        {
            id: 5,
            name: "Neha Patel",
            sport: "Basketball",
            matches: 128,
            wins: 91,
            points: 1545,
            rating: 4.7
        },

        {
            id: 6,
            name: "Jay Patel",
            sport: "Table Tennis",
            matches: 119,
            wins: 84,
            points: 1475,
            rating: 4.6
        },

        {
            id: 7,
            name: "Karan Mehta",
            sport: "Football",
            matches: 115,
            wins: 80,
            points: 1390,
            rating: 4.6
        },

        {
            id: 8,
            name: "Vivek Shah",
            sport: "Chess",
            matches: 108,
            wins: 76,
            points: 1325,
            rating: 4.5
        },

        {
            id: 9,
            name: "Dhruv Joshi",
            sport: "Cricket",
            matches: 102,
            wins: 70,
            points: 1260,
            rating: 4.5
        },

        {
            id: 10,
            name: "Meet Desai",
            sport: "Badminton",
            matches: 98,
            wins: 67,
            points: 1195,
            rating: 4.4
        }

    ];


    /* =====================================================
       LOAD PLAYERS
       ===================================================== */

    let players = [];

    try {

        const storedPlayers =
            localStorage.getItem(
                "playconnect_leaderboard"
            );

        if (storedPlayers) {

            players =
                JSON.parse(storedPlayers);

        }

    } catch (error) {

        console.error(
            "Error loading leaderboard:",
            error
        );

    }


    /* =====================================================
       USE DEFAULT DATA IF EMPTY
       ===================================================== */

    if (
        !Array.isArray(players) ||
        players.length === 0
    ) {

        players =
            [...defaultPlayers];

        localStorage.setItem(
            "playconnect_leaderboard",
            JSON.stringify(players)
        );

    }


    /* =====================================================
       CALCULATE WIN RATE
       ===================================================== */

    function getWinRate(player) {

        if (
            !player.matches ||
            player.matches <= 0
        ) {

            return 0;

        }

        return Math.round(
            (player.wins / player.matches) * 100
        );

    }


    /* =====================================================
       SORT PLAYERS
       ===================================================== */

    function sortPlayers(data) {

        const sortValue =
            sortSelect
                ? sortSelect.value
                : "points";


        return [...data].sort(
            (a, b) => {

                switch (sortValue) {

                    case "wins":

                        return b.wins - a.wins;


                    case "matches":

                        return b.matches - a.matches;


                    case "rating":

                        return b.rating - a.rating;


                    case "winrate":

                        return (
                            getWinRate(b) -
                            getWinRate(a)
                        );


                    case "points":

                    default:

                        return b.points - a.points;

                }

            }
        );

    }


    /* =====================================================
       FILTER PLAYERS
       ===================================================== */

    function filterPlayers() {

        let filtered =
            [...players];


        /* SEARCH */

        if (searchInput) {

            const search =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (search) {

                filtered =
                    filtered.filter(
                        player =>

                            player.name
                                .toLowerCase()
                                .includes(search)

                            ||

                            player.sport
                                .toLowerCase()
                                .includes(search)
                    );

            }

        }


        /* SPORT FILTER */

        if (sportFilter) {

            const sport =
                sportFilter.value;


            if (
                sport &&
                sport !== "All Sports" &&
                sport !== "all"
            ) {

                filtered =
                    filtered.filter(
                        player =>
                            player.sport === sport
                    );

            }

        }


        return sortPlayers(filtered);

    }


    /* =====================================================
       RENDER LEADERBOARD
       ===================================================== */

    function renderLeaderboard() {

        if (!leaderboardBody) {

            console.warn(
                "Leaderboard table body not found."
            );

            return;

        }


        const filtered =
            filterPlayers();


        leaderboardBody.innerHTML = "";


        if (filtered.length === 0) {

            leaderboardBody.innerHTML = `

                <tr>

                    <td colspan="8"
                        style="text-align:center;">

                        <i class="fa-solid fa-user-slash"></i>

                        No players found.

                    </td>

                </tr>

            `;

            return;

        }


        filtered.forEach(
            (player, index) => {

                const row =
                    document.createElement("tr");


                const rank =
                    index + 1;


                let rankClass =
                    "";


                if (rank === 1) {

                    rankClass =
                        "rank-first";

                } else if (rank === 2) {

                    rankClass =
                        "rank-second";

                } else if (rank === 3) {

                    rankClass =
                        "rank-third";

                }


                row.innerHTML = `

                    <td class="${rankClass}">

                        ${
                            rank === 1
                                ? "🥇"
                                : rank === 2
                                ? "🥈"
                                : rank === 3
                                ? "🥉"
                                : rank
                        }

                    </td>


                    <td>

                        <div class="leader-player">

                            <div class="player-avatar">

                                ${getInitials(
                                    player.name
                                )}

                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        player.name
                                    )}
                                </strong>

                                <small>
                                    ${escapeHTML(
                                        player.sport
                                    )}
                                </small>

                            </div>

                        </div>

                    </td>


                    <td>

                        ${player.sport}

                    </td>


                    <td>

                        ${player.matches}

                    </td>


                    <td>

                        ${player.wins}

                    </td>


                    <td>

                        ${getWinRate(player)}%

                    </td>


                    <td>

                        <strong>
                            ${player.points}
                        </strong>

                    </td>


                    <td>

                        ⭐ ${player.rating}

                    </td>

                `;


                leaderboardBody.appendChild(
                    row
                );

            }
        );


        updateLeaderboardStats(
            filtered
        );

    }


    /* =====================================================
       PLAYER INITIALS
       ===================================================== */

    function getInitials(name) {

        if (!name) {

            return "PC";

        }


        const words =
            name
                .trim()
                .split(/\s+/);


        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       UPDATE STATISTICS
       ===================================================== */

    function updateLeaderboardStats(data) {

        const totalPlayers =
            document.querySelector(
                "#totalPlayers"
            );

        const totalMatches =
            document.querySelector(
                "#totalMatches"
            );

        const totalWins =
            document.querySelector(
                "#totalWins"
            );

        const averageRating =
            document.querySelector(
                "#averageRating"
            );


        if (totalPlayers) {

            totalPlayers.textContent =
                data.length;

        }


        if (totalMatches) {

            const matches =
                data.reduce(
                    (
                        total,
                        player
                    ) =>
                        total +
                        Number(
                            player.matches || 0
                        ),
                    0
                );


            totalMatches.textContent =
                matches;

        }


        if (totalWins) {

            const wins =
                data.reduce(
                    (
                        total,
                        player
                    ) =>
                        total +
                        Number(
                            player.wins || 0
                        ),
                    0
                );


            totalWins.textContent =
                wins;

        }


        if (averageRating) {

            if (data.length === 0) {

                averageRating.textContent =
                    "0";

            } else {

                const rating =
                    data.reduce(
                        (
                            total,
                            player
                        ) =>
                            total +
                            Number(
                                player.rating || 0
                            ),
                        0
                    ) / data.length;


                averageRating.textContent =
                    rating.toFixed(1);

            }

        }

    }


    /* =====================================================
       EVENT LISTENERS
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderLeaderboard
        );

    }


    if (sportFilter) {

        sportFilter.addEventListener(
            "change",
            renderLeaderboard
        );

    }


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            renderLeaderboard
        );

    }


    /* =====================================================
       RESET FILTERS
       ===================================================== */

    const resetButton =
        document.querySelector(
            "#resetLeaderboard"
        ) ||
        document.querySelector(
            ".reset-leaderboard"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value =
                        "";

                }


                if (sportFilter) {

                    sportFilter.selectedIndex =
                        0;

                }


                if (sortSelect) {

                    sortSelect.value =
                        "points";

                }


                renderLeaderboard();

            }
        );

    }


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    renderLeaderboard();


    /* =====================================================
       EXPOSE FUNCTION
       ===================================================== */

    window.PlayConnectLeaderboard = {

        getPlayers: () => players,

        refresh: renderLeaderboard,

        reset: () => {

            players =
                [...defaultPlayers];

            localStorage.setItem(
                "playconnect_leaderboard",
                JSON.stringify(players)
            );

            renderLeaderboard();

        }

    };


});