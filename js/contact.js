document.addEventListener("DOMContentLoaded", function () {
	const inputs = document.querySelectorAll(".input, .contact-form-textarea");
	const optionsLabels = document.querySelectorAll(".options-label");
	const agreementInput = document.querySelector(".agreement-input");
	const agreementsBox = document.querySelector(".agreements");

	optionsLabels.forEach((label) => {
		label.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				const forId = label.getAttribute("for");
				if (forId) {
					const input = document.getElementById(forId);
					if (input && !input.checked) {
						input.checked = true;
					}
				}
			}
		});
	});

	agreementInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			agreementInput.checked = !agreementInput.checked;
		}
	});

	inputs.forEach((input) => {
		if (input.value.trim() !== "") {
			input.classList.add("not-empty");
		}
		input.addEventListener("input", function (e) {
			const element = e.target;
			if (element.value.trim() !== "") {
				element.classList.add("not-empty");
			} else {
				element.classList.remove("not-empty");
			}
		});
	});

	// HANDLE FORM
	const msgStatus = document.querySelector(".msg-status");
	const msgStatusText = document.querySelector(".msg-status__info");
	const inputName = document.querySelector(".name-input");
	const inputPhone = document.querySelector(".phone-input");
	const inputEmail = document.querySelector(".email-input");
	const inputArea = document.querySelector(".area-input");
	const inputTiers = document.querySelector(".tiers-input");
	const sendBtn = document.querySelector(".contact-form-btn");
	const textInputs = [inputName, inputPhone, inputEmail, inputArea, inputTiers];
	const MAX_LENGTH = 9;

	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get("mail_status") === "sent") {
		msgStatus.classList.add("success");
		msgStatusText.textContent = "Wiadomość wysłana!";
		setTimeout(() => {
			msgStatus.classList.remove("success");
			history.replaceState(null, "", window.location.pathname);
		}, 3000);
	}

	const checkPhoneFormat = (input) => {
		const onlyDigits = /^\d+$/;
		if (input.value !== "" && !onlyDigits.test(input.value)) {
			showError(input, "Podano niepoprawny numer telefonu!");
		}
	};

	const showError = (input, msg) => {
		const formBox = input.parentElement;
		const errorMsg = formBox.querySelector(".contact-form-box-error");
		formBox.classList.add("error");
		errorMsg.textContent = msg;
	};

	const clearError = (input) => {
		const formBox = input.parentElement;
		const errorMsg = formBox.querySelector(".contact-form-box-error");
		formBox.classList.remove("error");
		errorMsg.textContent = "";
	};

	const checkForm = (input) => {
		input.forEach((el) => {
			if (el.value === "") {
				showError(el, "To pole nie może być puste!");
			} else {
				clearError(el);
			}
		});
	};

	const checkLength = (input, min) => {
		const nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż\- ]+$/;

		if (input.value !== "" && input.value.length < min) {
			const inputLabel = input.nextElementSibling.textContent;

			if (input.classList.contains("name-input")) {
				showError(input, `${inputLabel} musi składać się z min. ${min} znaków`);
			}
		} else if (nameRegex.test(input.value)) {
			clearError(input);
		} else if (input.value === "") {
			showError(input, "To pole nie może być puste!");
		} else {
			showError(input, "Podano niepoprawną wartość!");
		}
		{
		}
	};

	const checkPhoneLength = (input) => {
		if (
			input.classList.contains("phone-input") &&
			input.value.length !== MAX_LENGTH &&
			input.value !== ""
		) {
			showError(input, `Numer telefonu musi składać się z ${MAX_LENGTH} cyfr`);
		}
	};
	const checkAreaInput = (area) => {
		const areaRegex = /^(?!0+(?:[.,]0+)?$)\d+(?:[.,]\d+)?$/;

		if (areaRegex.test(area.value)) {
			clearError(area);
		} else if (area.value === "") {
			showError(area, "To pole nie może być puste!");
		} else {
			showError(area, "Podano niepoprawną wartość!");
		}
	};
	const checkTiersInput = (tier) => {
		const tierRegex = /^(?:[1-9]|[1-4][0-9]|50)$/;

		if (tierRegex.test(tier.value)) {
			clearError(tier);
		} else if (tier.value === "") {
			showError(tier, "To pole nie może być puste!");
		} else {
			showError(tier, "Podano niepoprawną wartość!");
		}
	};
	const checkMail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

		if (emailRegex.test(email.value)) {
			clearError(email);
		} else if (email.value === "") {
			showError(email, "To pole nie może być puste!");
		} else {
			showError(email, "Podano niepoprawny email!");
		}
	};

	const checkIfChecked = () => {
		const allQuestionBoxes = document.querySelectorAll(
			".contact-form-question-box"
		);

		allQuestionBoxes.forEach((questionBox) => {
			const radioInputs = questionBox.querySelectorAll('input[type="radio"]');
			const isChecked = Array.from(radioInputs).some((input) => input.checked);
			const errorMsg = questionBox.querySelector(
				".contact-form-box-question-error"
			);

			if (!isChecked) {
				errorMsg.textContent = "Proszę zaznaczyć jedną z opcji.";
				questionBox.classList.add("error");
			} else {
				errorMsg.textContent = "";
				questionBox.classList.remove("error");
			}
		});
	};

	const checkAgreements = () => {
		if (agreementInput.checked === false) {
			agreementsBox.classList.add("error");
		} else {
			agreementsBox.classList.remove("error");
		}
	};

	const checkErrors = () => {
		const allInputs = document.querySelectorAll(".form-box");
		const hasError = Array.from(allInputs).some((el) =>
			el.classList.contains("error")
		);

		if (!hasError) {
			document.querySelector(".contact-form").submit();
		} else {
			console.log("Są błędy — formularz nie zostanie wysłany.");
		}
	};

	sendBtn.addEventListener("click", (e) => {
		e.preventDefault();

		checkForm(textInputs);
		checkLength(inputName, 2);
		checkPhoneLength(inputPhone);
		checkMail(inputEmail);
		checkAreaInput(inputArea);
		checkTiersInput(inputTiers);
		checkPhoneFormat(inputPhone);
		checkIfChecked();
		checkAgreements();
		checkErrors();
	});
});
