document.addEventListener("DOMContentLoaded", () => {

    console.log("PlayConnect Contact JS loaded.");

    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    const successMessage =
        document.getElementById(
            "contactSuccess"
        );


    const errorMessage =
        document.getElementById(
            "contactError"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    contactForm.querySelector(
                        '[name="name"]'
                    );


                const email =
                    contactForm.querySelector(
                        '[name="email"]'
                    );


                const phone =
                    contactForm.querySelector(
                        '[name="phone"]'
                    );


                const subject =
                    contactForm.querySelector(
                        '[name="subject"]'
                    );


                const message =
                    contactForm.querySelector(
                        '[name="message"]'
                    );


                let isValid = true;


                /* Remove previous errors */

                contactForm
                    .querySelectorAll(
                        ".input-error"
                    )
                    .forEach(
                        input => {

                            input.classList.remove(
                                "input-error"
                            );

                        }
                    );


                /* Name */

                if (
                    name &&
                    name.value.trim().length < 2
                ) {

                    markError(name);

                    isValid = false;

                }


                /* Email */

                if (
                    email &&
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    markError(email);

                    isValid = false;

                }


                /* Phone */

                if (
                    phone &&
                    phone.value.trim()
                ) {

                    const phoneValue =
                        phone.value
                            .replace(/\s+/g, "");


                    if (
                        !/^[+]?[0-9]{10,15}$/
                            .test(phoneValue)
                    ) {

                        markError(phone);

                        isValid = false;

                    }

                }


                /* Subject */

                if (
                    subject &&
                    subject.value.trim().length < 3
                ) {

                    markError(subject);

                    isValid = false;

                }


                /* Message */

                if (
                    message &&
                    message.value.trim().length < 10
                ) {

                    markError(message);

                    isValid = false;

                }


                if (!isValid) {

                    showError(
                        "Please fill in all required fields correctly."
                    );

                    return;

                }


                /* =================================================
                   SAVE MESSAGE LOCALLY
                   ================================================= */

                const contactData = {

                    id:
                        Date.now(),

                    name:
                        name
                            ? name.value.trim()
                            : "",

                    email:
                        email
                            ? email.value.trim()
                            : "",

                    phone:
                        phone
                            ? phone.value.trim()
                            : "",

                    subject:
                        subject
                            ? subject.value.trim()
                            : "",

                    message:
                        message
                            ? message.value.trim()
                            : "",

                    date:
                        new Date()
                            .toISOString(),

                    status:
                        "new"

                };


                saveContactMessage(
                    contactData
                );


                /* =================================================
                   SUCCESS
                   ================================================= */

                showSuccess(
                    "Your message has been sent successfully! We will get back to you soon."
                );


                contactForm.reset();


                updateCharacterCount();

            }
        );

    }


    /* =====================================================
       VALIDATE EMAIL
       ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =====================================================
       MARK INPUT ERROR
       ===================================================== */

    function markError(input) {

        input.classList.add(
            "input-error"
        );


        input.addEventListener(
            "input",
            () => {

                input.classList.remove(
                    "input-error"
                );

            },
            {
                once: true
            }
        );

    }


    /* =====================================================
       SUCCESS MESSAGE
       ===================================================== */

    function showSuccess(message) {

        if (successMessage) {

            successMessage.textContent =
                message;

            successMessage.classList.add(
                "show"
            );

            if (errorMessage) {

                errorMessage.classList.remove(
                    "show"
                );

            }

            setTimeout(
                () => {

                    successMessage.classList.remove(
                        "show"
                    );

                },
                5000
            );

            return;

        }


        showNotification(
            message,
            "success"
        );

    }


    /* =====================================================
       ERROR MESSAGE
       ===================================================== */

    function showError(message) {

        if (errorMessage) {

            errorMessage.textContent =
                message;

            errorMessage.classList.add(
                "show"
            );

            if (successMessage) {

                successMessage.classList.remove(
                    "show"
                );

            }

            setTimeout(
                () => {

                    errorMessage.classList.remove(
                        "show"
                    );

                },
                5000
            );

            return;

        }


        showNotification(
            message,
            "error"
        );

    }


    /* =====================================================
       NOTIFICATION
       ===================================================== */

    function showNotification(
        message,
        type
    ) {

        const notification =
            document.createElement(
                "div"
            );


        notification.className =
            `contact-notification ${type}`;


        notification.innerHTML = `

            <i class="fa-solid ${
                type === "success"
                    ? "fa-circle-check"
                    : "fa-circle-exclamation"
            }"></i>

            <span>
                ${escapeHTML(message)}
            </span>

        `;


        document.body.appendChild(
            notification
        );


        setTimeout(
            () => {

                notification.classList.add(
                    "hide"
                );

                setTimeout(
                    () => {

                        notification.remove();

                    },
                    400
                );

            },
            4000
        );

    }


    /* =====================================================
       SAVE CONTACT MESSAGE
       ===================================================== */

    function saveContactMessage(
        contactData
    ) {

        let messages = [];


        try {

            const stored =
                localStorage.getItem(
                    "playconnect_contacts"
                );


            if (stored) {

                messages =
                    JSON.parse(stored);

            }

        } catch (error) {

            console.error(
                "Unable to read contact messages:",
                error
            );

        }


        if (!Array.isArray(messages)) {

            messages = [];

        }


        messages.push(
            contactData
        );


        localStorage.setItem(
            "playconnect_contacts",
            JSON.stringify(messages)
        );


        console.log(
            "Contact message saved."
        );

    }


    /* =====================================================
       CHARACTER COUNTER
       ===================================================== */

    const messageInput =
        document.querySelector(
            'textarea[name="message"]'
        );


    const characterCount =
        document.getElementById(
            "characterCount"
        );


    if (messageInput) {

        messageInput.addEventListener(
            "input",
            updateCharacterCount
        );


        updateCharacterCount();

    }


    function updateCharacterCount() {

        if (
            !messageInput ||
            !characterCount
        ) {

            return;

        }


        const currentLength =
            messageInput.value.length;


        const maxLength =
            messageInput.maxLength;


        if (maxLength > 0) {

            characterCount.textContent =
                `${currentLength}/${maxLength}`;

        } else {

            characterCount.textContent =
                `${currentLength} characters`;

        }

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(
        item => {

            const question =
                item.querySelector(
                    "h3, h4, .faq-question"
                );


            const answer =
                item.querySelector(
                    "p, .faq-answer"
                );


            if (
                !question ||
                !answer
            ) {

                return;

            }


            answer.style.maxHeight =
                "0px";

            answer.style.overflow =
                "hidden";

            answer.style.transition =
                "max-height 0.35s ease";


            question.style.cursor =
                "pointer";


            question.addEventListener(
                "click",
                () => {

                    const isOpen =
                        item.classList.contains(
                            "active"
                        );


                    faqItems.forEach(
                        other => {

                            other.classList.remove(
                                "active"
                            );


                            const otherAnswer =
                                other.querySelector(
                                    "p, .faq-answer"
                                );


                            if (
                                otherAnswer
                            ) {

                                otherAnswer.style.maxHeight =
                                    "0px";

                            }

                        }
                    );


                    if (!isOpen) {

                        item.classList.add(
                            "active"
                        );


                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }
            );

        }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );


    const navbar =
        document.getElementById(
            "navbar"
        );


    if (
        menuBtn &&
        navbar
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                navbar.classList.toggle(
                    "active"
                );

                menuBtn.classList.toggle(
                    "active"
                );

            }
        );


        navbar
            .querySelectorAll("a")
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            navbar.classList.remove(
                                "active"
                            );

                            menuBtn.classList.remove(
                                "active"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 400
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (progressBar) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollTop =
                    window.scrollY;


                const documentHeight =
                    document.documentElement
                        .scrollHeight -
                    window.innerHeight;


                if (
                    documentHeight <= 0
                ) {

                    return;

                }


                const progress =
                    (
                        scrollTop /
                        documentHeight
                    ) * 100;


                progressBar.style.width =
                    progress + "%";

            }
        );

    }


    /* =====================================================
       INPUT FOCUS EFFECT
       ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".form-group input, " +
            ".form-group textarea, " +
            ".form-group select"
        );


    inputs.forEach(
        input => {

            input.addEventListener(
                "focus",
                () => {

                    input
                        .closest(
                            ".form-group"
                        )
                        ?.classList.add(
                            "focused"
                        );

                }
            );


            input.addEventListener(
                "blur",
                () => {

                    input
                        .closest(
                            ".form-group"
                        )
                        ?.classList.remove(
                            "focused"
                        );

                }
            );

        }
    );


    /* =====================================================
       HTML ESCAPE
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    console.log(
        "Contact page initialized successfully."
    );

});