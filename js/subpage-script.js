const handleFooterYear = () => {
	const currentYear = new Date().getFullYear();
	document.querySelector(".footer__year").textContent = currentYear;
};
handleFooterYear();

// HANDLE BACK TO TOP

const backToTopArrowBtn = document.querySelector(".back-to-top");

const handleBackToTop = () => {
	const windowHeight = 500;
	if (window.scrollY >= windowHeight) {
		backToTopArrowBtn.classList.remove("hidden");
		backToTopArrowBtn.classList.add("active");
	} else if (
		window.scrollY < windowHeight &&
		backToTopArrowBtn.classList.contains("active")
	) {
		backToTopArrowBtn.classList.remove("active");
		backToTopArrowBtn.classList.add("hidden");
	}
};

window.addEventListener("scroll", handleBackToTop);
backToTopArrowBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0 });
});
