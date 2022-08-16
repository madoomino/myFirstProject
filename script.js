"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const h1 = document.querySelector("h1");
const message = document.createElement("div");
const btn = document.querySelector(".btn--scroll-to");
const logo = document.getElementById("logo");
const sec1 = document.getElementById("section--1");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
message.classList.add("cookie-message");
message.innerHTML = `Hello <button class="btn btn--close--cookie">Got it!</button>`;
// document.querySelector('.header').append(message);

// document.querySelector('.header').append(message.cloneNode(true)); // a clone
// document.querySelector('.header').before(message.cloneNode(true)); // sibling
// document.querySelector('.header').after(message.cloneNode(true)); // sibling

// document.querySelector('.btn--close--cookie').addEventListener('click', () => {
//   message.remove(); // better way
//   // message.style.opacity = '0'; // old way
//   // message.parentElement.removeChild(message); sucks :)
// });

const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
	btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});
document.querySelectorAll('a[href^="#"]').forEach((a) => {
	a.addEventListener("click", function (e) {
		e.preventDefault();
		const href = this.getAttribute("href");
		const elem =
			document.querySelector(href) ||
			document.querySelector("a[name=" + href.substring(1, href.length) + "]");
		window.scroll({
			top: elem.offsetTop,
			left: 0,
			behavior: "smooth",
		});
	});
});
console.log(getComputedStyle(h1).color);

message.style.height =
	Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty('--color-primary', 'orangered');

logo.alt = "hahah";
logo.setAttribute("im", "madoo");
console.log(logo.dataset.madooMino);

btn.addEventListener("click", function () {
	// const s1coords = sec1.getBoundingClientRect();
	// window.scrollTo({ top: s1coords.top + window.scrollY, behavior: 'smooth' });

	sec1.scrollIntoView({ behavior: "smooth" }); // best way
});

console.log(h1.closest(".header").children); // the siblings of h1
console.log(h1.closest("h1").children); // the children of h1
console.log(h1.nextElementSibling); // previous and next siblings

[...h1.parentElement.children].forEach((el) => {
	// control other siblings
	if (el !== h1) el.style.transform = "scale(1)";
});

const tab = document.querySelector(".operations__tab-container");
tab.addEventListener("click", function (e) {
	if (e.target.classList.contains("btn")) {
		const tab = e.target.closest(".operations__tab");

		// remove active class
		document
			.querySelectorAll(".operations__content")
			.forEach((c) => c.classList.remove("operations__content--active"));
		document
			.querySelectorAll(".operations__tab")
			.forEach((b) => b.classList.remove("operations__tab--active"));

		// add active class
		document
			.querySelector(`.operations__content--${tab.dataset.tab}`)
			.classList.add("operations__content--active");
		tab.classList.add("operations__tab--active");
	}
});

// clicking logo
const goToHeader = function () {
	header.scrollIntoView({ behavior: "smooth" });
};

// Fade Animation

// const fader = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clicker = e.target;
//     const siblings = clicker.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicker.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== clicker) {
//         el.style.opacity = this;
//         logo.style.opacity = this;
//       }
//     });
//   }
// };
// nav.addEventListener('mouseover', fader.bind(0.5));
// nav.addEventListener('mouseout', fader.bind(1));

const fader = function (e) {
	const link = e.target;
	if (link.classList.contains("nav__link")) {
		document
			.querySelectorAll(".nav__link")
			.forEach((el) => el.classList.remove("active"));
		link.classList.add("active");
		document
			.querySelectorAll(".nav__link")
			.forEach((el) =>
				!el.classList.contains("active") ? (el.style.opacity = this) : el
			);
	}
};
nav.addEventListener("mouseover", fader.bind(0.5));
nav.addEventListener("mouseout", fader.bind(1));

// const sec1coords = sec1.getBoundingClientRect();
// With eventListener
// console.log(sec1coords.top);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > sec1coords.top - nav.clientHeight) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// with observer

const navSticky = function ([entry]) {
	if (!entry.isIntersecting) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
};

const navObserver = new IntersectionObserver(navSticky, {
	root: null,
	threshold: 0,
	rootMargin: `-${nav.clientHeight}px`,
});
navObserver.observe(header);

// revealing sections on scroll
const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
	function ([entry]) {
		if (!entry.isIntersecting) return;
		entry.target.classList.remove("section--hidden");
		sectionObserver.unobserve(entry.target);
	},
	{
		root: null,
		threshold: 0.15,
	}
);
sections.forEach(function (sec) {
	sec.classList.add("section--hidden");
	sectionObserver.observe(sec);
});
const imgs = document.querySelectorAll(".lazy-img");
const imgRev = function ([entry]) {
	if (!entry.isIntersecting) return;
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener("load", function () {
		entry.target.classList.remove("lazy-img");
	});
	imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(imgRev, {
	root: null,
	threshold: 0.1,
});
imgs.forEach((img) => imgObserver.observe(img));

// window.addEventListener("beforeunload", function (e) {
// 	e.preventDefault();
// 	e.returnValue = "";
// });

Array.prototype.madoo = function () {
	console.log("hello");
};

const mad = [0, 1, 2, 3, 4, 5];
mad.madoo;
