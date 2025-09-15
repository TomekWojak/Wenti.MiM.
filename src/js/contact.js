export const initContactPopupFunction = () => {
	const contactPopup = document.querySelector(".contact__popup");
	const closePopupBtn = document.querySelector(".contact__popup-close");
	const footerList = document.querySelector(".footer__list");
	const footerLink = footerList.querySelector(
		".footer__list-item:first-child .footer__link"
	);

	let showPopupDelay = 5000;

	const showPopup = () => {
		const wasSeen = localStorage.getItem("seen");

		if (wasSeen) return;

		contactPopup.classList.add("popup-visible");
	};
	const closePopup = () => {
		localStorage.setItem("seen", true);
		contactPopup.classList.remove("popup-visible");
	};

	setTimeout(showPopup, showPopupDelay);
	footerLink.addEventListener("click", () =>
		contactPopup.classList.add("popup-visible")
	);
	closePopupBtn.addEventListener("click", closePopup);
};
