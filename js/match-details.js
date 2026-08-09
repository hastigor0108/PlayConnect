 /* =========================================================
    PLAYCONNECT - MATCH DETAILS JAVASCRIPT
    ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("PlayConnect Match Details JS loaded.");

    /* =====================================================
       GET MATCHES FROM LOCAL STORAGE
       ===================================================== */

    let matches = [];

    try {

        const storedMatches =
            localStorage.getItem("playconnect_matches");

        if (storedMatches) {

            matches = JSON.parse(storedMatches);

        }

        if (!Array.isArray(matches)) {

            matches = [];

        }

    } catch (error) {

        console.error(
            "Error loading matches:",
            error
        );

        matches = [];

    }


    /* =====================================================
       GET LAST CREATED MATCH
       ===================================================== */

    let selectedMatch = null;

    try {

        const lastMatch =
            localStorage.getItem(
                "playconnect_last_match"
            );

        if (lastMatch) {

            selectedMatch =
                JSON.parse(lastMatch);

        }

    } catch (error) {

        console.error(
            "Error loading last match:",
            error
        );

    }


    /* =====================================================
       IF NO LAST MATCH → USE LATEST MATCH
       ===================================================== */

    if (!selectedMatch && matches.length > 0) {

        selectedMatch =
            matches[matches.length - 1];

    }


    /* =====================================================
       ELEMENT SELECTOR HELPER
       ===================================================== */

    function findElement(...selectors) {

        for (const selector of selectors) {

            const element =
                document.querySelector(selector);

            if (element) {

                return element;

            }

        }

        return null;

    }


    /* =====================================================
       UPDATE MATCH DETAILS
       ===================================================== */

    function updateMatchDetails(match) {

        if (!match) {

            showNoMatchMessage();

            return;

        }


        /* ---------------------------------------------
           TITLE
           --------------------------------------------- */

        const title =
            findElement(
                "#matchTitle",
                ".match-title",
                ".details-title",
                "[data-match-title]"
            );

        if (title) {

            title.textContent =
                match.title || "Sports Match";

        }


        /* ---------------------------------------------
           SPORT
           --------------------------------------------- */

        const sport =
            findElement(
                "#matchSport",
                ".match-sport",
                "[data-match-sport]"
            );

        if (sport) {

            sport.textContent =
                match.sport || "Sport";

        }


        /* ---------------------------------------------
           DATE
           --------------------------------------------- */

        const date =
            findElement(
                "#matchDate",
                ".match-date",
                "[data-match-date]"
            );

        if (date) {

            date.textContent =
                formatDate(match.date);

        }


        /* ---------------------------------------------
           TIME
           --------------------------------------------- */

        const time =
            findElement(
                "#matchTime",
                ".match-time",
                "[data-match-time]"
            );

        if (time) {

            time.textContent =
                formatTime(match.time);

        }


        /* ---------------------------------------------
           LOCATION
           --------------------------------------------- */

        const location =
            findElement(
                "#matchLocation",
                ".match-location",
                "[data-match-location]"
            );

        if (location) {

            location.textContent =
                match.location || "Location not specified";

        }


        /* ---------------------------------------------
           PLAYERS
           --------------------------------------------- */

        const players =
            findElement(
                "#matchPlayers",
                ".match-players",
                "[data-match-players]"
            );

        if (players) {

            players.textContent =
                match.players || "Not specified";

        }


        /* ---------------------------------------------
           SKILL LEVEL
           --------------------------------------------- */

        const skill =
            findElement(
                "#matchSkill",
                ".match-skill",
                ".skill-level",
                "[data-match-skill]"
            );

        if (skill) {

            skill.textContent =
                match.skillLevel || "All Levels";

        }


        /* ---------------------------------------------
           MATCH TYPE
           --------------------------------------------- */

        const type =
            findElement(
                "#matchType",
                ".match-type",
                "[data-match-type]"
            );

        if (type) {

            type.textContent =
                match.matchType || "Friendly";

        }


        /* ---------------------------------------------
           DESCRIPTION
           --------------------------------------------- */

        const description =
            findElement(
                "#matchDescription",
                ".match-description",
                "[data-match-description]"
            );

        if (description) {

            description.textContent =
                match.description ||
                "No description provided.";

        }


        /* ---------------------------------------------
           CREATED BY
           --------------------------------------------- */

        const createdBy =
            findElement(
                "#createdBy",
                ".created-by",
                "[data-created-by]"
            );

        if (createdBy) {

            createdBy.textContent =
                match.createdBy || "PlayConnect User";

        }


        /* ---------------------------------------------
           STATUS
           --------------------------------------------- */

        const status =
            findElement(
                "#matchStatus",
                ".match-status",
                ".status",
                "[data-match-status]"
            );

        if (status) {

            status.textContent =
                match.status || "Upcoming";

        }


        /* ---------------------------------------------
           MATCH ID
           --------------------------------------------- */

        const matchId =
            findElement(
                "#matchId",
                ".match-id",
                "[data-match-id]"
            );

        if (matchId) {

            matchId.textContent =
                match.id || "N/A";

        }

    }


    /* =====================================================
       FORMAT DATE
       ===================================================== */

    function formatDate(dateString) {

        if (!dateString) {

            return "Date not specified";

        }

        const date =
            new Date(dateString);

        if (isNaN(date.getTime())) {

            return dateString;

        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       FORMAT TIME
       ===================================================== */

    function formatTime(timeString) {

        if (!timeString) {

            return "Time not specified";

        }

        const parts =
            timeString.split(":");

        if (parts.length < 2) {

            return timeString;

        }

        let hours =
            parseInt(parts[0], 10);

        const minutes =
            parts[1];

        const period =
            hours >= 12 ? "PM" : "AM";

        hours =
            hours % 12 || 12;

        return `${hours}:${minutes} ${period}`;

    }


    /* =====================================================
       NO MATCH MESSAGE
       ===================================================== */

    function showNoMatchMessage() {

        const container =
            findElement(
                ".match-details-container",
                ".match-details",
                ".details-container",
                "main"
            );

        if (!container) {

            console.warn(
                "Match details container not found."
            );

            return;

        }


        const message =
            document.createElement("div");

        message.className =
            "no-match-message";

        message.innerHTML = `

            <div class="no-match-content">

                <i class="fa-solid fa-calendar-xmark"></i>

                <h2>No Match Found</h2>

                <p>
                    No match has been created yet.
                    Create a match to see its details here.
                </p>

                <a href="create-match.html"
                   class="primary-btn">

                    Create Match

                </a>

            </div>

        `;


        container.innerHTML = "";

        container.appendChild(message);

    }


    /* =====================================================
       DELETE MATCH
       ===================================================== */

    const deleteButton =
        findElement(
            "#deleteMatch",
            ".delete-match",
            "[data-delete-match]"
        );

    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                if (!selectedMatch) {

                    alert(
                        "No match available to delete."
                    );

                    return;

                }


                const confirmed =
                    confirm(
                        "Are you sure you want to delete this match?"
                    );


                if (!confirmed) {

                    return;

                }


                matches =
                    matches.filter(
                        match =>
                            match.id !==
                            selectedMatch.id
                    );


                localStorage.setItem(
                    "playconnect_matches",
                    JSON.stringify(matches)
                );


                localStorage.removeItem(
                    "playconnect_last_match"
                );


                alert(
                    "Match deleted successfully."
                );


                window.location.href =
                    "create-match.html";

            }
        );

    }


    /* =====================================================
       JOIN MATCH
       ===================================================== */

    const joinButton =
        findElement(
            "#joinMatch",
            ".join-match",
            "[data-join-match]"
        );

    if (joinButton) {

        joinButton.addEventListener(
            "click",
            () => {

                if (!selectedMatch) {

                    alert(
                        "No match available."
                    );

                    return;

                }


                let joinedMatches = [];

                try {

                    const stored =
                        localStorage.getItem(
                            "playconnect_joined_matches"
                        );

                    if (stored) {

                        joinedMatches =
                            JSON.parse(stored);

                    }

                    if (!Array.isArray(joinedMatches)) {

                        joinedMatches = [];

                    }

                } catch (error) {

                    joinedMatches = [];

                }


                const alreadyJoined =
                    joinedMatches.some(
                        match =>
                            match.id ===
                            selectedMatch.id
                    );


                if (alreadyJoined) {

                    alert(
                        "You have already joined this match."
                    );

                    return;

                }


                joinedMatches.push(
                    selectedMatch
                );


                localStorage.setItem(
                    "playconnect_joined_matches",
                    JSON.stringify(
                        joinedMatches
                    )
                );


                alert(
                    "You joined the match successfully!"
                );


                joinButton.textContent =
                    "Joined";

                joinButton.disabled =
                    true;

            }
        );

    }


    /* =====================================================
       SHARE MATCH
       ===================================================== */

    const shareButton =
        findElement(
            "#shareMatch",
            ".share-match",
            "[data-share-match]"
        );

    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async () => {

                if (!selectedMatch) {

                    return;

                }


                const shareText =
                    `${selectedMatch.title} - ${selectedMatch.sport}
                    
Date: ${formatDate(selectedMatch.date)}
Time: ${formatTime(selectedMatch.time)}
Location: ${selectedMatch.location}`;


                try {

                    if (
                        navigator.share
                    ) {

                        await navigator.share({

                            title:
                                selectedMatch.title,

                            text:
                                shareText,

                            url:
                                window.location.href

                        });

                    } else {

                        await navigator.clipboard.writeText(
                            shareText
                        );

                        alert(
                            "Match details copied to clipboard!"
                        );

                    }

                } catch (error) {

                    console.log(
                        "Share cancelled."
                    );

                }

            }
        );

    }


    /* =====================================================
       SHOW MATCH
       ===================================================== */

    updateMatchDetails(
        selectedMatch
    );


    /* =====================================================
       CONSOLE INFORMATION
       ===================================================== */

    console.log(
        "Available matches:",
        matches
    );

    console.log(
        "Selected match:",
        selectedMatch
    );

});