/* =========================================================
   PLAYCONNECT - PROFILE.JS
   Profile Page Functionality
   ========================================================= */


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadProfileData();

    setupProfileActions();

    setupProfileTabs();

    setupEditPhoto();

});


/* =========================================================
   LOAD PROFILE DATA
   ========================================================= */

function loadProfileData() {

    let user = getUser();

    /*
       If no user exists, create demo user
       so profile page never appears empty.
    */

    if (!user) {

        user = createDefaultUser();

    }


    /* -------------------------------
       Profile Header
       ------------------------------- */

    const profileName =
        document.querySelector(".profile-info h1");

    if (profileName) {

        profileName.textContent =
            user.name ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim();

    }


    const profileLocation =
        document.querySelector(".profile-location");

    if (profileLocation && user.city) {

        profileLocation.innerHTML =
            `<i class="fa-solid fa-location-dot"></i>
             ${user.city}, Gujarat`;

    }


    const profileDescription =
        document.querySelector(".profile-info p");

    if (profileDescription && user.favoriteSport) {

        profileDescription.textContent =
            `${user.favoriteSport} Player`;

    }


    /* -------------------------------
       Personal Information
       ------------------------------- */

    const inputs =
        document.querySelectorAll(
            ".profile-content .info-box input"
        );


    inputs.forEach(function (input) {

        const label =
            input.parentElement
                .querySelector("label");

        if (!label) {
            return;
        }


        const labelText =
            label.textContent
                .trim()
                .toLowerCase();


        if (labelText === "full name") {

            input.value =
                user.name ||
                `${user.firstName || ""} ${user.lastName || ""}`.trim();

        }


        if (labelText === "email") {

            input.value =
                user.email || "";

        }


        if (
            labelText === "mobile number" ||
            labelText === "phone number"
        ) {

            input.value =
                user.mobile || "";

        }


        if (labelText === "city") {

            input.value =
                user.city || "";

        }


        if (labelText === "favorite sport") {

            input.value =
                user.favoriteSport || "";

        }

    });


    /* -------------------------------
       Skill Level
       ------------------------------- */

    const skillSelect =
        document.querySelector(
            ".profile-content .info-box select"
        );


    if (skillSelect && user.skillLevel) {

        skillSelect.value =
            user.skillLevel;

    }


    /* -------------------------------
       About Me
       ------------------------------- */

    const aboutTextarea =
        document.querySelector(
            ".profile-content textarea"
        );


    if (aboutTextarea && user.about) {

        aboutTextarea.value =
            user.about;

    }


    /* -------------------------------
       Statistics
       ------------------------------- */

    updateProfileStats(user);

}


/* =========================================================
   UPDATE PROFILE STATISTICS
   ========================================================= */

function updateProfileStats(user) {

    const statCards =
        document.querySelectorAll(
            ".profile-stats .stat-card"
        );


    if (statCards.length >= 4) {

        const matchesPlayed =
            statCards[0].querySelector("h2");

        const matchesWon =
            statCards[1].querySelector("h2");

        const rank =
            statCards[2].querySelector("h2");

        const tournaments =
            statCards[3].querySelector("h2");


        if (matchesPlayed) {

            matchesPlayed.textContent =
                user.matchesPlayed ?? 156;

        }


        if (matchesWon) {

            matchesWon.textContent =
                user.matchesWon ?? 121;

        }


        if (rank) {

            rank.textContent =
                "#" + (user.leaderboardRank ?? 18);

        }


        if (tournaments) {

            tournaments.textContent =
                user.tournaments ?? 12;

        }

    }

}


/* =========================================================
   PROFILE ACTIONS
   ========================================================= */

function setupProfileActions() {

    const editButton =
        document.querySelector(
            ".profile-actions .primary-btn"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                enableProfileEditing();

            }
        );

    }


    const saveButton =
        document.querySelector(
            ".profile-content .primary-btn"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                saveProfileChanges();

            }
        );

    }

}


/* =========================================================
   ENABLE PROFILE EDITING
   ========================================================= */

function enableProfileEditing() {

    const profileContent =
        document.querySelector(
            ".profile-content"
        );


    if (!profileContent) {
        return;
    }


    const fields =
        profileContent.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(function (field) {

        field.removeAttribute("readonly");

        field.removeAttribute("disabled");

    });


    const firstInput =
        profileContent.querySelector(
            "input"
        );


    if (firstInput) {

        firstInput.focus();

    }


    showProfileMessage(
        "You can now edit your profile information.",
        "success"
    );

}


/* =========================================================
   SAVE PROFILE CHANGES
   ========================================================= */

function saveProfileChanges() {

    let user =
        getUser();


    if (!user) {

        user =
            createDefaultUser();

    }


    const inputs =
        document.querySelectorAll(
            ".profile-content .info-box input"
        );


    inputs.forEach(function (input) {

        const label =
            input.parentElement
                .querySelector("label");


        if (!label) {
            return;
        }


        const labelText =
            label.textContent
                .trim()
                .toLowerCase();


        if (labelText === "full name") {

            user.name =
                input.value.trim();

        }


        if (labelText === "email") {

            user.email =
                input.value.trim();

        }


        if (
            labelText === "mobile number" ||
            labelText === "phone number"
        ) {

            user.mobile =
                input.value.trim();

        }


        if (labelText === "city") {

            user.city =
                input.value.trim();

        }


        if (labelText === "favorite sport") {

            user.favoriteSport =
                input.value.trim();

        }

    });


    /* -------------------------------
       Skill Level
       ------------------------------- */

    const skillSelect =
        document.querySelector(
            ".profile-content select"
        );


    if (skillSelect) {

        user.skillLevel =
            skillSelect.value;

    }


    /* -------------------------------
       About
       ------------------------------- */

    const aboutTextarea =
        document.querySelector(
            ".profile-content textarea"
        );


    if (aboutTextarea) {

        user.about =
            aboutTextarea.value.trim();

    }


    /* -------------------------------
       First & Last Name
       ------------------------------- */

    if (user.name) {

        const nameParts =
            user.name.split(" ");

        user.firstName =
            nameParts.shift() || "";

        user.lastName =
            nameParts.join(" ");

    }


    /* -------------------------------
       Save
       ------------------------------- */

    updateUser(user);


    /* Refresh profile */

    loadProfileData();


    showProfileMessage(
        "Profile changes saved successfully!",
        "success"
    );

}


/* =========================================================
   PROFILE MESSAGE
   ========================================================= */

function showProfileMessage(
    message,
    type = "success"
) {

    let messageBox =
        document.querySelector(
            ".profile-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "profile-message";


        const profileContent =
            document.querySelector(
                ".profile-content"
            );


        if (profileContent) {

            profileContent.prepend(
                messageBox
            );

        }

    }


    messageBox.textContent =
        message;


    messageBox.className =
        `profile-message ${type}`;


    setTimeout(function () {

        messageBox.classList.add(
            "hide"
        );

    }, 3000);

}


/* =========================================================
   PROFILE TABS
   ========================================================= */

function setupProfileTabs() {

    const sidebarItems =
        document.querySelectorAll(
            ".profile-sidebar li"
        );


    sidebarItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                sidebarItems.forEach(
                    function (otherItem) {

                        otherItem.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );


                const text =
                    item.textContent
                        .trim()
                        .toLowerCase();


                if (
                    text.includes("personal")
                ) {

                    scrollToSection(
                        ".profile-content"
                    );

                }


                else if (
                    text.includes("achievement")
                ) {

                    scrollToSection(
                        ".achievements-section"
                    );

                }


                else if (
                    text.includes("upcoming")
                ) {

                    scrollToSection(
                        ".upcoming-matches"
                    );

                }


                else if (
                    text.includes("history")
                ) {

                    scrollToSection(
                        ".match-history"
                    );

                }


                else if (
                    text.includes("setting")
                ) {

                    showProfileMessage(
                        "Settings are coming soon.",
                        "info"
                    );

                }

            }
        );

    });

}


/* =========================================================
   SCROLL TO SECTION
   ========================================================= */

function scrollToSection(selector) {

    const section =
        document.querySelector(
            selector
        );


    if (section) {

        section.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}


/* =========================================================
   PROFILE PHOTO
   ========================================================= */

function setupEditPhoto() {

    const editPhoto =
        document.querySelector(
            ".edit-photo"
        );


    if (!editPhoto) {
        return;
    }


    editPhoto.addEventListener(
        "click",
        function () {

            showProfileMessage(
                "Profile photo upload will be available soon.",
                "info"
            );

        }
    );

}


/* =========================================================
   AUTO CALCULATE WIN RATE
   ========================================================= */

function calculateWinRate(
    matchesPlayed,
    matchesWon
) {

    if (
        !matchesPlayed ||
        matchesPlayed <= 0
    ) {

        return 0;

    }


    return Math.round(
        (matchesWon / matchesPlayed) * 100
    );

}


/* =========================================================
   UPDATE PERFORMANCE SECTION
   ========================================================= */

function updatePerformance() {

    const user =
        getUser();


    if (!user) {
        return;
    }


    const winRate =
        calculateWinRate(
            user.matchesPlayed,
            user.matchesWon
        );


    const performanceCards =
        document.querySelectorAll(
            ".performance-card"
        );


    if (performanceCards.length >= 1) {

        const winRateHeading =
            performanceCards[0]
                .querySelector("h2");


        if (winRateHeading) {

            winRateHeading.textContent =
                winRate + "%";

        }

    }

}


/* =========================================================
   INITIAL PERFORMANCE UPDATE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updatePerformance();

    }
);