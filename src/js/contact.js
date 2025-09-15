export const initContactPopupFunction = () => {
	const contactPopup = document.querySelector(".contact__popup");
	const closePopupBtn = document.querySelector(".contact__popup-close");
	const footerList = document.querySelector(".footer__list");
	const footerLink = footerList.querySelector(
		".footer__list-item:first-child .footer__link"
	);
	const contactForm = document.querySelector(".contact__popup-form");
	const contactFormTextInput = contactForm.querySelector(
		".contact__popup-input"
	);
	const allLabels = contactForm.querySelectorAll(".contact__popup-label");
	const msgStatusBox = document.querySelector(".msg-status");
	const contactFormError = contactForm.querySelector(".contact__popup-error");

	const contactFormRadioInputs = Array.from(
		contactForm.querySelectorAll(".contact__popup-radio")
	);

	let showPopupDelay = 5000;

	const URL = new URLSearchParams(window.location.search);
	const msgStatus = URL.get("mail_status");

	const showMsg = (cls, text) => {
		msgStatusBox.classList.add(cls);
		msgStatusBox.querySelector(".msg-status__info").textContent = text;
	};

	const showMsgStatus = () => {
		if (!msgStatus) return;

		if (msgStatus === "sent") {
			showMsg("success", "Wysłano pomyślnie!");
		} else if (msgStatus === "error") {
			showMsg("error", "Wysyłanie nie powiodło się!");
		}
	};
	const sendForm = () => {
		contactForm.submit();
	};
	const showPopup = () => {
		const wasSeen = localStorage.getItem("seen");

		if (wasSeen) return;

		contactPopup.classList.add("popup-visible");
	};
	const closePopup = () => {
		localStorage.setItem("seen", true);
		contactPopup.classList.remove("popup-visible");
		contactFormRadioInputs.forEach((input) => (input.checked = false));
		contactFormTextInput.value = "";
		contactFormError.classList.remove("visible");
	};

	let isSending = false;
	const handleContactForm = (e) => {
		e.preventDefault();
		checkIfFilled();
		if (isSending) return;

		if (checkIfFilled()) {
			isSending = true;
			sendForm();
		}
	};

	const checkIfFilled = () => {
		if (!contactFormRadioInputs) return;

		const checkedInputs = contactFormRadioInputs.filter(
			(input) => input.checked
		);
		const value = contactFormTextInput.value.trim();

		if (value === "" || checkedInputs.length === 0) {
			contactFormError.textContent = "Uzupełnij wszystkie pola";
			contactFormError.classList.add("visible");
			isSending = false;
		} else {
			contactFormError.classList.remove("visible");
			return true;
		}
	};
	allLabels.forEach((label) =>
		label.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.target.previousElementSibling.checked = true;
			}
		})
	);
	showMsgStatus();
	setTimeout(showPopup, showPopupDelay);
	footerLink.addEventListener("click", () =>
		contactPopup.classList.add("popup-visible")
	);
	contactForm.addEventListener("submit", handleContactForm);
	closePopupBtn.addEventListener("click", closePopup);
};
