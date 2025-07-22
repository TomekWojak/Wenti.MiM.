document.addEventListener("DOMContentLoaded", function () {
	const handleFooterYear = () => {
		const currentYear = new Date().getFullYear();
		document.querySelector(".footer__year").textContent = currentYear;
	};
	handleFooterYear();

	// SECTiON ANIMATIONS
	const sectionOptions = {
		rootMargin: "-200px",
	};

	const toAnimateSections = document.querySelectorAll(".to-animate");
	if (window.innerWidth >= 900) {
		const sectionObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animated");
					observer.unobserve(entry.target);
				}
			});
		}, sectionOptions);

		toAnimateSections.forEach((section) => {
			sectionObserver.observe(section);
		});
	} else {
		toAnimateSections.forEach((section) =>
			section.classList.remove("to-animate")
		);
	}

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

	// ADDING SVG ICONS TO NAV SECTION
	const airConditioningImg = document.querySelector(
		".nav__link-img-conditioning"
	);
	const recuperationImg = document.querySelector(".nav__link-img-recuperation");
	const wodkanImg = document.querySelector(".nav__link-img-wodkan");
	fetch("./images/svg/fan-icon.svg")
		.then((res) => res.text())
		.then((data) => {
			airConditioningImg.innerHTML = data;
		})
		.catch((err) => console.error(err));
	fetch("./images/svg/recuperation-icon.svg")
		.then((res) => res.text())
		.then((data) => {
			recuperationImg.innerHTML = data;
		})
		.catch((err) => console.error(err));
	fetch("./images/svg/wod-kan-icon.svg")
		.then((res) => res.text())
		.then((data) => {
			wodkanImg.innerHTML = data;
		})
		.catch((err) => console.error(err));

	// ADDING SVG ICONS TO NAV SECTION

	const counterItems = document.querySelectorAll(".counter__stats-stat");
	const counterBox = document.querySelector(".counter");

	const options = {
		rootMargin: "-250px",
	};
	const startCounter = (entry) => {
		if (entry[0].isIntersecting) {
			counterItems.forEach((counter) => {
				const updateCounter = () => {
					const finalNumber = counter.getAttribute("data-number");
					const value = parseInt(counter.textContent);
					counter.classList.add("show");

					const speed = 2;

					if (value < finalNumber) {
						counter.textContent = `${Math.floor(value + speed)}`;
						setTimeout(updateCounter, 5);
					} else {
						counter.textContent = finalNumber;
					}
				};
				updateCounter();
			});
		}
	};

	const observer = new IntersectionObserver(startCounter, options);
	observer.observe(counterBox);

	// GALLERY
	const imagesBox = document.querySelector(".gallery__images");
	const allImages = document.querySelectorAll(".gallery__img");
	const nextBtn = document.querySelector(".gallery__btn--next");
	const prevBtn = document.querySelector(".gallery__btn--prev");
	const popup = document.querySelector(".gallery__popup");
	const popupImg = popup.querySelector(".gallery__popup-img");
	const closePopupBtn = popup.querySelector(".gallery__close-popup");
	let index = 1;
	let step;
	let width;

	const showNextSlide = () => {
		if (index === allImages.length - 2) {
			showNextImg();
			nextBtn.classList.add("disabled");
			nextBtn.setAttribute("disabled", "true");
		} else {
			prevBtn.removeAttribute("disabled");
			prevBtn.classList.remove("disabled");
			nextBtn.classList.remove("disabled");
			nextBtn.removeAttribute("disabled");
			showNextImg();
		}
	};
	const turnOnDisabled = () => {
		if (window.innerWidth <= 900) {
			prevBtn.classList.add("disabled");
			prevBtn.setAttribute("disabled", "true");
		}
	};
	const showPrevSlide = () => {
		if (index === 1 && window.innerWidth >= 900) {
			showPrevImg();
			prevBtn.classList.add("disabled");
			prevBtn.setAttribute("disabled", "true");
		} else if (index === 2 && window.innerWidth < 900) {
			showPrevImg();
			prevBtn.classList.add("disabled");
			prevBtn.setAttribute("disabled", "true");
		} else {
			nextBtn.classList.remove("disabled");
			nextBtn.removeAttribute("disabled");
			showPrevImg();
		}
	};
	const showPrevImg = () => {
		allImages[index].classList.remove("active");
		index--;
		allImages[index].classList.add("active");
		step = window.innerWidth >= 900 ? 33.33 : 100;
		width = (index - 1) * step;
		imagesBox.style.transform = `translateX(${-width}%)`;
	};
	const showNextImg = () => {
		allImages[index].classList.remove("active");
		index++;

		allImages[index].classList.add("active");
		step = window.innerWidth >= 900 ? 33.33 : 100;
		width = (index - 1) * step;
		imagesBox.style.transform = `translateX(${-width}%)`;
	};

	const showPopup = () => {
		popup.classList.toggle("active");
		document.body.classList.toggle("popup-active");
	};
	window.addEventListener("resize", () => {
		step = window.innerWidth >= 900 ? 33.33 : 100;
		width = (index - 1) * step;
		imagesBox.style.transform = `translateX(${-width}%)`;
	});
	popup.addEventListener("click", (e) => {
		if (e.target === popup) {
			showPopup();
		}
	});
	allImages.forEach((img) =>
		img.addEventListener("click", () => {
			const src = img.getAttribute("src");
			popupImg.setAttribute("src", src);
			showPopup();
		})
	);
	closePopupBtn.addEventListener("click", showPopup);
	turnOnDisabled();
	prevBtn.addEventListener("click", showPrevSlide);
	nextBtn.addEventListener("click", showNextSlide);

	// REVIEWS

	const reviewsBox = document.querySelector(".reviews__reviews");
	const allReviews = document.querySelectorAll(".reviews__box");
	let reviewsSpeed = 4000;
	let reviewsIndex = 0;
	let startX;
	let endX;
	let reviewsCarousellInterval;

	const handleReviewsCarousell = () => {
		let step = window.innerWidth >= 800 ? 50 : 100;
		let deviceIndex =
			window.innerWidth >= 800 ? allReviews.length - 2 : allReviews.length - 1;

		if (reviewsIndex >= deviceIndex) {
			reviewsIndex = 0;
			reviewsBox.style.transform = `translateX(0)`;
		} else {
			reviewsIndex++;
			let width = reviewsIndex * step;
			reviewsBox.style.transform = `translateX(${-width}%)`;
		}
	};

	window.addEventListener("resize", () => {
		let step = window.innerWidth >= 800 ? 50 : 100;
		let width = reviewsIndex * step;
		reviewsBox.style.transform = `translateX(${-width}%)`;
	});

	reviewsCarousellInterval = setInterval(handleReviewsCarousell, reviewsSpeed);

	reviewsBox.addEventListener("touchstart", (e) => {
		e.preventDefault();
		startX = e.touches[0].clientX;
		clearInterval(reviewsCarousellInterval);
	});
	reviewsBox.addEventListener("touchend", (e) => {
		e.preventDefault();
		endX = e.changedTouches[0].clientX;
		handleSwipe();
		reviewsCarousellInterval = setInterval(
			handleReviewsCarousell,
			reviewsSpeed
		);
	});

	const handleSwipe = () => {
		const threshold = 50;
		const width = window.innerWidth >= 800 ? 50 : 100;
		const maxIndex =
			window.innerWidth >= 800 ? allReviews.length - 2 : allReviews.length - 1;

		if (startX - endX > threshold && reviewsIndex < maxIndex) {
			reviewsIndex++;
		} else if (endX - startX > threshold && reviewsIndex > 0) {
			reviewsIndex--;
		}

		reviewsBox.style.transform = `translateX(${-width * reviewsIndex}%)`;
	};

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
