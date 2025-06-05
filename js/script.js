document.addEventListener("DOMContentLoaded", function () {
	const airConditioningImg = document.querySelector(
		".nav__link-img-conditioning"
	);
	const recuperationImg = document.querySelector(
		".nav__link-img-recuperation"
	);
	const wodkanImg = document.querySelector(
		".nav__link-img-wodkan"
	);
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
});
