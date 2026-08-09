/* =========================================================
   PLAYCONNECT - STORAGE.JS
   Common LocalStorage Management
   ========================================================= */


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {

    USER: "playconnect_user",
    USERS: "playconnect_users",
    MATCHES: "playconnect_matches",
    TOURNAMENTS: "playconnect_tournaments",
    SETTINGS: "playconnect_settings"

};


/* =========================================================
   GENERIC STORAGE FUNCTIONS
   ========================================================= */

function saveData(key, data) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Error saving data:",
            error
        );

        return false;
    }
}


function getData(key, defaultValue = null) {

    try {

        const data =
            localStorage.getItem(key);

        if (data === null) {
            return defaultValue;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Error reading data:",
            error
        );

        return defaultValue;
    }
}


function removeData(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Error removing data:",
            error
        );

        return false;
    }
}


/* =========================================================
   USER DATA
   ========================================================= */

function saveUser(user) {

    return saveData(
        STORAGE_KEYS.USER,
        user
    );

}


function getUser() {

    return getData(
        STORAGE_KEYS.USER,
        null
    );

}


function removeUser() {

    return removeData(
        STORAGE_KEYS.USER
    );

}


/* =========================================================
   REGISTERED USERS
   ========================================================= */

function getUsers() {

    return getData(
        STORAGE_KEYS.USERS,
        []
    );

}


function saveUsers(users) {

    return saveData(
        STORAGE_KEYS.USERS,
        users
    );

}


function addUser(user) {

    const users = getUsers();

    users.push(user);

    return saveUsers(users);

}


/* =========================================================
   FIND USER BY EMAIL
   ========================================================= */

function findUserByEmail(email) {

    const users = getUsers();

    return users.find(function (user) {

        return (
            user.email &&
            user.email.toLowerCase() ===
            email.toLowerCase()
        );

    }) || null;

}


/* =========================================================
   UPDATE USER
   ========================================================= */

function updateUser(updatedUser) {

    const users = getUsers();

    const index = users.findIndex(function (user) {

        return (
            user.email &&
            updatedUser.email &&
            user.email.toLowerCase() ===
            updatedUser.email.toLowerCase()
        );

    });


    if (index === -1) {

        return false;

    }


    users[index] = updatedUser;

    saveUsers(users);

    saveUser(updatedUser);

    return true;

}


/* =========================================================
   MATCH DATA
   ========================================================= */

function getMatches() {

    return getData(
        STORAGE_KEYS.MATCHES,
        []
    );

}


function saveMatches(matches) {

    return saveData(
        STORAGE_KEYS.MATCHES,
        matches
    );

}


function addMatch(match) {

    const matches = getMatches();

    match.id =
        Date.now();

    match.createdAt =
        new Date().toISOString();

    matches.push(match);

    return saveMatches(matches);

}


/* =========================================================
   TOURNAMENT DATA
   ========================================================= */

function getTournaments() {

    return getData(
        STORAGE_KEYS.TOURNAMENTS,
        []
    );

}


function saveTournaments(tournaments) {

    return saveData(
        STORAGE_KEYS.TOURNAMENTS,
        tournaments
    );

}


function addTournament(tournament) {

    const tournaments =
        getTournaments();

    tournament.id =
        Date.now();

    tournament.createdAt =
        new Date().toISOString();

    tournaments.push(tournament);

    return saveTournaments(
        tournaments
    );

}


/* =========================================================
   SETTINGS
   ========================================================= */

function getSettings() {

    return getData(
        STORAGE_KEYS.SETTINGS,
        {

            notifications: true,
            emailUpdates: true,
            darkMode: false

        }
    );

}


function saveSettings(settings) {

    return saveData(
        STORAGE_KEYS.SETTINGS,
        settings
    );

}


/* =========================================================
   CLEAR ALL PLAYCONNECT DATA
   ========================================================= */

function clearPlayConnectData() {

    Object.values(STORAGE_KEYS)
        .forEach(function (key) {

            localStorage.removeItem(key);

        });

}


/* =========================================================
   CHECK LOGIN STATUS
   ========================================================= */

function isUserLoggedIn() {

    const user =
        getUser();

    return user !== null;

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    removeUser();

    window.location.href =
        "login.html";

}


/* =========================================================
   DEFAULT USER
   ========================================================= */

function createDefaultUser() {

    const existingUser =
        getUser();

    if (existingUser) {

        return existingUser;

    }


    const defaultUser = {

        firstName: "Rahul",
        lastName: "Patel",

        name: "Rahul Patel",

        email: "rahul@example.com",

        mobile: "+91 98765 43210",

        city: "Ahmedabad",

        favoriteSport: "Cricket",

        skillLevel: "Intermediate",

        about:
            "Passionate sports enthusiast who enjoys playing cricket, badminton, and football.",

        matchesPlayed: 156,

        matchesWon: 121,

        leaderboardRank: 18,

        tournaments: 12

    };


    saveUser(defaultUser);

    return defaultUser;

}