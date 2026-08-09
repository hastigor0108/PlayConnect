/* =========================================================
   PLAYCONNECT - SIGNUP.JS
   Signup / Registration Functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupSignupForm();
    setupPasswordToggle();
    setupSocialSignup();

});


/* =========================================================
   SIGNUP FORM
   ========================================================= */

function setupSignupForm() {

    const signupForm =
        document.getElementById("signupForm");

    if (!signupForm) {
        return;
    }

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const inputs =
            signupForm.querySelectorAll(
                "input:not([type='checkbox']), select"
            );

        const firstName =
            inputs[0]?.value.trim() || "";

        const lastName =
            inputs[1]?.value.trim() || "";

        const email =
            inputs[2]?.value.trim() || "";

        const mobile =
            inputs[3]?.value.trim() || "";

        const dob =
            inputs[4]?.value || "";

        const favoriteSport =
            inputs[5]?.value || "";

        const city =
            inputs[6]?.value || "";

        const password =
            document.getElementById(
                "signupPassword"
            )?.value || "";

        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            )?.value || "";

        const terms =
            signupForm.querySelector(
                "input[type='checkbox']"
            );


        /* -------------------------------
           Basic Validation
        ------------------------------- */

        if (
            !firstName ||
            !lastName ||
            !email ||
            !mobile ||
            !dob ||
            !favoriteSport ||
            !city ||
            !password ||
            !confirmPassword
        ) {

            showSignupMessage(
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Email Validation
        ------------------------------- */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showSignupMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Mobile Validation
        ------------------------------- */

        const mobilePattern =
            /^[0-9+\-\s]{10,15}$/;

        if (!mobilePattern.test(mobile)) {

            showSignupMessage(
                "Please enter a valid mobile number.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Password Validation
        ------------------------------- */

        if (password.length < 6) {

            showSignupMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Confirm Password
        ------------------------------- */

        if (password !== confirmPassword) {

            showSignupMessage(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Terms
        ------------------------------- */

        if (terms && !terms.checked) {

            showSignupMessage(
                "Please agree to the Terms & Conditions.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Check Existing User
        ------------------------------- */

        let users =
            JSON.parse(
                localStorage.getItem(
                    "playconnect_users"
                )
            ) || [];


        const existingUser =
            users.find(
                function (user) {

                    return user.email.toLowerCase() ===
                           email.toLowerCase();

                }
            );


        if (existingUser) {

            showSignupMessage(
                "An account with this email already exists.",
                "error"
            );

            return;
        }


        /* -------------------------------
           Create User
        ------------------------------- */

        const newUser = {

            id:
                Date.now(),

            firstName:
                firstName,

            lastName:
                lastName,

            name:
                `${firstName} ${lastName}`,

            email:
                email,

            mobile:
                mobile,

            dob:
                dob,

            favoriteSport:
                favoriteSport,

            city:
                city,

            skillLevel:
                "Beginner",

            about:
                "Sports enthusiast and PlayConnect member.",

            password:
                password,

            matchesPlayed:
                0,

            matchesWon:
                0,

            leaderboardRank:
                "-",

            tournaments:
                0,

            createdAt:
                new Date().toISOString()

        };


        /* -------------------------------
           Save User
        ------------------------------- */

        users.push(newUser);

        localStorage.setItem(
            "playconnect_users",
            JSON.stringify(users)
        );


        /* -------------------------------
           Save Current User
        ------------------------------- */

        localStorage.setItem(
            "playconnect_current_user",
            JSON.stringify(newUser)
        );


        /* -------------------------------
           Success
        ------------------------------- */

        showSignupMessage(
            "Account created successfully! Redirecting...",
            "success"
        );


        signupForm.reset();


        setTimeout(function () {

            window.location.href =
                "profile.html";

        }, 1200);

    });

}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function setupPasswordToggle() {

    const toggleButtons =
        document.querySelectorAll(
            ".toggle-password"
        );


    toggleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const input =
                        button.parentElement
                            .querySelector("input");


                    if (!input) {
                        return;
                    }


                    if (
                        input.type === "password"
                    ) {

                        input.type =
                            "text";

                        button.classList.remove(
                            "fa-eye"
                        );

                        button.classList.add(
                            "fa-eye-slash"
                        );

                    }

                    else {

                        input.type =
                            "password";

                        button.classList.remove(
                            "fa-eye-slash"
                        );

                        button.classList.add(
                            "fa-eye"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   SOCIAL SIGNUP BUTTONS
   ========================================================= */

function setupSocialSignup() {

    const socialButtons =
        document.querySelectorAll(
            ".social-login .social-btn"
        );


    socialButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const buttonText =
                        button.textContent
                            .trim();


                    if (
                        buttonText
                            .toLowerCase()
                            .includes("google")
                    ) {

                        showSignupMessage(
                            "Google signup integration will be added later.",
                            "info"
                        );

                    }

                    else if (
                        buttonText
                            .toLowerCase()
                            .includes("facebook")
                    ) {

                        showSignupMessage(
                            "Facebook signup integration will be added later.",
                            "info"
                        );

                    }

                    else if (
                        buttonText
                            .toLowerCase()
                            .includes("github")
                    ) {

                        showSignupMessage(
                            "GitHub signup integration will be added later.",
                            "info"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   SHOW SIGNUP MESSAGE
   ========================================================= */

function showSignupMessage(
    message,
    type = "success"
) {

    let messageBox =
        document.querySelector(
            ".signup-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "signup-message";


        const signupCard =
            document.querySelector(
                ".signup-card"
            );


        if (signupCard) {

            signupCard.prepend(
                messageBox
            );

        }

    }


    messageBox.textContent =
        message;


    messageBox.className =
        `signup-message ${type}`;


    messageBox.style.display =
        "block";


    setTimeout(function () {

        messageBox.style.display =
            "none";

    }, 4000);

}


/* =========================================================
   PASSWORD STRENGTH
   ========================================================= */

function checkPasswordStrength(password) {

    let strength = 0;


    if (password.length >= 6) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[a-z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    if (strength <= 2) {

        return "Weak";

    }

    if (strength <= 4) {

        return "Medium";

    }

    return "Strong";

}


/* =========================================================
   PASSWORD INPUT FEEDBACK
   ========================================================= */

const signupPassword =
    document.getElementById(
        "signupPassword"
    );


if (signupPassword) {

    signupPassword.addEventListener(
        "input",
        function () {

            const strength =
                checkPasswordStrength(
                    signupPassword.value
                );


            let strengthBox =
                document.querySelector(
                    ".password-strength"
                );


            if (!strengthBox) {

                strengthBox =
                    document.createElement("small");

                strengthBox.className =
                    "password-strength";

                signupPassword
                    .parentElement
                    .parentElement
                    .appendChild(
                        strengthBox
                    );

            }


            strengthBox.textContent =
                signupPassword.value
                    ? `Password strength: ${strength}`
                    : "";

        }
    );

}


/* =========================================================
   CONFIRM PASSWORD CHECK
   ========================================================= */

const confirmPassword =
    document.getElementById(
        "confirmPassword"
    );


if (confirmPassword) {

    confirmPassword.addEventListener(
        "input",
        function () {

            const password =
                document.getElementById(
                    "signupPassword"
                );


            if (!password) {
                return;
            }


            if (
                confirmPassword.value &&
                password.value !==
                confirmPassword.value
            ) {

                confirmPassword.setCustomValidity(
                    "Passwords do not match."
                );

            }

            else {

                confirmPassword.setCustomValidity(
                    ""
                );

            }

        }
    );

}