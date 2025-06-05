document.addEventListener("DOMContentLoaded", function () {
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
});
