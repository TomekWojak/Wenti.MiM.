document.addEventListener("DOMContentLoaded", function () {
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

	// ACCORDION
	const allAccordionBtns = document.querySelectorAll(
		".questions__accordion-toggler"
	);

	allAccordionBtns.forEach((toggler) => {
		toggler.addEventListener("click", () => {
			const box = toggler.closest(".questions__accordion-box");
			const answer = box.querySelector(".questions__accordion-answer");

			const isOpen = answer.style.height && answer.style.height !== "0px";
			document
				.querySelectorAll(".questions__accordion-answer")
				.forEach((otherAnswer) => {
					if (otherAnswer !== answer) {
						otherAnswer.setAttribute("aria-hidden", "true");
						otherAnswer.style.height = otherAnswer.scrollHeight + "px";
						requestAnimationFrame(() => {
							otherAnswer.style.height = "0";
						});

						const otherToggler = otherAnswer
							.closest(".questions__accordion-box")
							.querySelector(".questions__accordion-toggler");
						otherToggler.classList.remove("opened");
						otherToggler.setAttribute("aria-expanded", "false");
					}
				});

			if (isOpen) {
				answer.setAttribute("aria-hidden", "true");
				toggler.setAttribute("aria-expanded", "false");
				toggler.classList.remove("opened");
				answer.style.height = answer.scrollHeight + "px";
				requestAnimationFrame(() => {
					answer.style.height = "0";
				});
			} else {
				answer.setAttribute("aria-hidden", "false");
				toggler.setAttribute("aria-expanded", "true");
				toggler.classList.add("opened");
				answer.style.height = answer.scrollHeight + "px";
			}
		});
	});
});
