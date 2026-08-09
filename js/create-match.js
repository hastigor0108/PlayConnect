/* =========================================================
   PLAYCONNECT - CREATE MATCH JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const createMatchForm = document.getElementById("createMatchForm");

    if (!createMatchForm) {
        console.warn("Create Match form not found.");
        return;
    }

    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const sportInput = document.getElementById("sport");
    const matchTitleInput = document.getElementById("matchTitle");
    const matchDateInput = document.getElementById("matchDate");
    const matchTimeInput = document.getElementById("matchTime");
    const locationInput = document.getElementById("location");
    const playersInput = document.getElementById("players");
    const skillLevelInput = document.getElementById("skillLevel");
    const matchTypeInput = document.getElementById("matchType");
    const descriptionInput = document.getElementById("description");


    /* =====================================================
       SET MINIMUM DATE = TODAY
       ===================================================== */

    if (matchDateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        matchDateInput.min = `${year}-${month}-${day}`;
    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    createMatchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        /* Get values */

        const sport = sportInput ? sportInput.value.trim() : "";
        const matchTitle = matchTitleInput
            ? matchTitleInput.value.trim()
            : "";

        const matchDate = matchDateInput
            ? matchDateInput.value
            : "";

        const matchTime = matchTimeInput
            ? matchTimeInput.value
            : "";

        const location = locationInput
            ? locationInput.value.trim()
            : "";

        const players = playersInput
            ? playersInput.value
            : "";

        const skillLevel = skillLevelInput
            ? skillLevelInput.value
            : "";

        const matchType = matchTypeInput
            ? matchTypeInput.value
            : "";

        const description = descriptionInput
            ? descriptionInput.value.trim()
            : "";


        /* =================================================
           VALIDATION
           ================================================= */

        if (!sport) {
            showMessage("Please select a sport.", "error");
            return;
        }

        if (!matchTitle) {
            showMessage("Please enter a match title.", "error");
            return;
        }

        if (!matchDate) {
            showMessage("Please select a match date.", "error");
            return;
        }

        if (!matchTime) {
            showMessage("Please select a match time.", "error");
            return;
        }

        if (!location) {
            showMessage("Please enter the match location.", "error");
            return;
        }

        if (!players) {
            showMessage("Please select the number of players.", "error");
            return;
        }

        if (!skillLevel) {
            showMessage("Please select the skill level.", "error");
            return;
        }

        if (!matchType) {
            showMessage("Please select the match type.", "error");
            return;
        }


        /* =================================================
           CREATE MATCH OBJECT
           ================================================= */

        const match = {

            id: "MATCH-" + Date.now(),

            sport: sport,

            title: matchTitle,

            date: matchDate,

            time: matchTime,

            location: location,

            players: players,

            skillLevel: skillLevel,

            matchType: matchType,

            description: description,

            createdBy: "Current User",

            status: "Upcoming",

            createdAt: new Date().toISOString()

        };


        /* =================================================
           GET EXISTING MATCHES
           ================================================= */

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
                "Unable to read stored matches:",
                error
            );

            matches = [];
        }


        /* =================================================
           ADD NEW MATCH
           ================================================= */

        matches.push(match);


        /* =================================================
           SAVE MATCH
           ================================================= */

        try {

            localStorage.setItem(
                "playconnect_matches",
                JSON.stringify(matches)
            );

        } catch (error) {

            console.error(
                "Unable to save match:",
                error
            );

            showMessage(
                "Unable to save match. Please try again.",
                "error"
            );

            return;
        }


        /* =================================================
           ALSO SAVE LAST CREATED MATCH
           ================================================= */

        localStorage.setItem(
            "playconnect_last_match",
            JSON.stringify(match)
        );


        /* =================================================
           SUCCESS MESSAGE
           ================================================= */

        showMessage(
            "Match created successfully!",
            "success"
        );


        /* =================================================
           RESET FORM
           ================================================= */

        createMatchForm.reset();


        /* =================================================
           OPTIONAL SUCCESS REDIRECT
           ================================================= */

        setTimeout(() => {

            const detailsPage =
                document.querySelector(
                    'a[href="match-details.html"]'
                );

            if (detailsPage) {

                window.location.href =
                    "match-details.html";

            }

        }, 1500);

    });


    /* =====================================================
       MESSAGE FUNCTION
       ===================================================== */

    function showMessage(message, type) {

        /* Remove old message */

        const oldMessage =
            document.querySelector(".match-message");

        if (oldMessage) {
            oldMessage.remove();
        }


        /* Create message */

        const messageBox =
            document.createElement("div");

        messageBox.className =
            `match-message ${type}`;

        messageBox.textContent = message;


        /* Basic styling */

        messageBox.style.padding = "12px 18px";
        messageBox.style.marginBottom = "20px";
        messageBox.style.borderRadius = "8px";
        messageBox.style.fontSize = "14px";
        messageBox.style.fontWeight = "500";


        if (type === "success") {

            messageBox.style.background =
                "#e8f8ef";

            messageBox.style.color =
                "#15803d";

            messageBox.style.border =
                "1px solid #86efac";

        } else {

            messageBox.style.background =
                "#fff1f2";

            messageBox.style.color =
                "#dc2626";

            messageBox.style.border =
                "1px solid #fca5a5";
        }


        /* Insert before form */

        createMatchForm.parentNode.insertBefore(
            messageBox,
            createMatchForm
        );


        /* Remove automatically */

        setTimeout(() => {

            if (messageBox) {
                messageBox.remove();
            }

        }, 4000);

    }


    /* =====================================================
       INPUT VALIDATION
       ===================================================== */

    if (playersInput) {

        playersInput.addEventListener(
            "input",
            () => {

                const value =
                    Number(playersInput.value);

                if (
                    playersInput.value &&
                    (value < 2 || value > 100)
                ) {

                    playersInput.setCustomValidity(
                        "Players must be between 2 and 100."
                    );

                } else {

                    playersInput.setCustomValidity("");

                }

            }
        );

    }


    /* =====================================================
       PREVENT PAST DATE
       ===================================================== */

    if (matchDateInput) {

        matchDateInput.addEventListener(
            "change",
            () => {

                const selectedDate =
                    new Date(matchDateInput.value);

                const today = new Date();

                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {

                    showMessage(
                        "Please select a future date.",
                        "error"
                    );

                    matchDateInput.value = "";
                }

            }
        );

    }


    /* =====================================================
       TITLE CHARACTER LIMIT
       ===================================================== */

    if (matchTitleInput) {

        matchTitleInput.maxLength = 80;

    }


    /* =====================================================
       DESCRIPTION CHARACTER LIMIT
       ===================================================== */

    if (descriptionInput) {

        descriptionInput.maxLength = 500;

    }


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "PlayConnect Create Match JS loaded successfully."
    );

});