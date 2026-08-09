/* =========================================================
   PLAYCONNECT - LOGIN.JS
   Login / Authentication System
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.querySelector(
            '#loginForm input[type="email"]'
        );

    const passwordInput =
        document.querySelector(
            '#loginForm input[type="password"]'
        );

    const togglePassword =
        document.querySelectorAll(
            ".toggle-password"
        );


    /* =====================================================
       PASSWORD TOGGLE
       ===================================================== */

    togglePassword.forEach(function (icon) {

        icon.addEventListener(
            "click",
            function () {

                const input =
                    icon.parentElement.querySelector(
                        "input"
                    );


                if (!input) {
                    return;
                }


                if (
                    input.type === "password"
                ) {

                    input.type =
                        "text";

                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );

                }

                else {

                    input.type =
                        "password";

                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );

                }

            }
        );

    });


    /* =====================================================
       LOGIN FORM
       ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearLoginMessage();


                const email =
                    emailInput
                        ? emailInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                /* -----------------------------------------
                   BASIC VALIDATION
                   ----------------------------------------- */

                if (!email) {

                    showLoginMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                if (!isValidEmail(email)) {

                    showLoginMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                if (!password) {

                    showLoginMessage(
                        "Please enter your password.",
                        "error"
                    );

                    if (passwordInput) {
                        passwordInput.focus();
                    }

                    return;

                }


                /* -----------------------------------------
                   GET REGISTERED USERS
                   ----------------------------------------- */

                const users =
                    JSON.parse(
                        localStorage.getItem(
                            "playconnect_users"
                        )
                    ) || [];


                /* -----------------------------------------
                   FIND USER
                   ----------------------------------------- */

                const user =
                    users.find(
                        function (storedUser) {

                            return (
                                storedUser.email
                                    .toLowerCase() ===
                                email
                            );

                        }
                    );


                /* -----------------------------------------
                   USER NOT FOUND
                   ----------------------------------------- */

                if (!user) {

                    showLoginMessage(
                        "No account found with this email. Please sign up first.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   PASSWORD CHECK
                   ----------------------------------------- */

                if (
                    user.password !==
                    password
                ) {

                    showLoginMessage(
                        "Incorrect password. Please try again.",
                        "error"
                    );

                    if (passwordInput) {
                        passwordInput.focus();
                    }

                    return;

                }


                /* -----------------------------------------
                   CREATE LOGIN SESSION
                   ----------------------------------------- */

                const loggedInUser = {
                    id:
                        user.id,

                    name:
                        user.name,

                    firstName:
                        user.firstName,

                    lastName:
                        user.lastName,

                    email:
                        user.email,

                    mobile:
                        user.mobile,

                    dob:
                        user.dob,

                    sport:
                        user.sport,

                    city:
                        user.city,

                    loginTime:
                        new Date().toISOString()
                };


                localStorage.setItem(
                    "playconnect_current_user",
                    JSON.stringify(
                        loggedInUser
                    )
                );


                localStorage.setItem(
                    "playconnect_logged_in",
                    "true"
                );


                /* -----------------------------------------
                   SUCCESS MESSAGE
                   ----------------------------------------- */

                showLoginMessage(
                    "Login successful! Redirecting...",
                    "success"
                );


                /* -----------------------------------------
                   REDIRECT
                   ----------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "profile.html";

                    },
                    1000
                );

            }
        );

    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =====================================================
       MESSAGE
       ===================================================== */

    function showLoginMessage(
        message,
        type
    ) {

        let messageBox =
            document.querySelector(
                ".login-message"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "div"
                );

            messageBox.className =
                "login-message";


            if (loginForm) {

                loginForm.prepend(
                    messageBox
                );

            }

        }


        messageBox.textContent =
            message;


        messageBox.className =
            `login-message ${type}`;


        messageBox.style.display =
            "block";

    }


    /* =====================================================
       CLEAR MESSAGE
       ===================================================== */

    function clearLoginMessage() {

        const messageBox =
            document.querySelector(
                ".login-message"
            );


        if (messageBox) {

            messageBox.textContent =
                "";

            messageBox.style.display =
                "none";

        }

    }


    /* =====================================================
       REMEMBER ME
       ===================================================== */

    const rememberCheckbox =
        document.querySelector(
            'input[type="checkbox"]'
        );


    if (
        rememberCheckbox &&
        emailInput
    ) {

        const savedEmail =
            localStorage.getItem(
                "playconnect_remember_email"
            );


        if (savedEmail) {

            emailInput.value =
                savedEmail;

            rememberCheckbox.checked =
                true;

        }


        loginForm?.addEventListener(
            "submit",
            function () {

                if (
                    rememberCheckbox.checked
                ) {

                    localStorage.setItem(
                        "playconnect_remember_email",
                        emailInput.value
                            .trim()
                            .toLowerCase()
                    );

                }

                else {

                    localStorage.removeItem(
                        "playconnect_remember_email"
                    );

                }

            }
        );

    }


    /* =====================================================
       SOCIAL LOGIN PLACEHOLDERS
       ===================================================== */

    const socialButtons =
        document.querySelectorAll(
            ".social-login .social-btn"
        );


    socialButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const provider =
                    button.textContent
                        .trim();


                showLoginMessage(
                    `${provider} is not connected yet. Please use email and password login.`,
                    "info"
                );

            }
        );

    });

});