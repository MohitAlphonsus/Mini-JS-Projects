const inputContainer = document.getElementById('custom-countdown-input');
const countdownContainer = document.getElementById('countdown');
const countdownCompleteContainer =
	document.getElementById('countdown-complete');

const form = document.getElementById('form');

const inputTitleEl = document.getElementById('input-title');
const inputDateEl = document.getElementById('input-date');

const resetTimerBtn = document.getElementById('reset-timer');
const newCountdownBtn = document.getElementById('new-countdown');

const customTitleEl = document.getElementById('custom-title');
const completeCountdownTextEl = document.getElementById(
	'complete-countdown-text',
);
const timeEls = document.querySelectorAll('.time-el');

/************************************************************************* */
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
inputDateEl.setAttribute('min', today);

function updateCountdownAndUI() {
	countdownActive = setInterval(() => {
		const now = new Date().getTime();
		const distance = countdownValue - now;
		const days = Math.floor(distance / day);
		const hours = Math.floor((distance % day) / hour);
		const minutes = Math.floor((distance % hour) / minute);
		const seconds = Math.floor((distance % minute) / second);
		inputContainer.classList.remove('show-container');

		if (distance < 0) {
			countdownContainer.classList.remove('show-container');
			clearInterval(countdownActive);
			completeCountdownTextEl.textContent = `${countdownTitle} finished on ${countdownDate}`;
			countdownCompleteContainer.classList.add('show-container');
		} else {
			timeEls[0].textContent = `${days}`.padStart(2, '0');
			timeEls[1].textContent = `${hours}`.padStart(2, '0');
			timeEls[2].textContent = `${minutes}`.padStart(2, '0');
			timeEls[3].textContent = `${seconds}`.padStart(2, '0');

			inputContainer.classList.remove('show-container');
			countdownContainer.classList.add('show-container');
		}
	}, second);
}

function updateCountdown(event) {
	event.preventDefault();
	countdownTitle = inputTitleEl.value;
	countdownDate = inputDateEl.value;

	savedCountdown = {
		title: countdownTitle,
		date: countdownDate,
	};

	localStorage.setItem('countdown', JSON.stringify(savedCountdown));

	if (!countdownDate) {
		alert('please select date');
	} else {
		countdownValue = new Date(countdownDate).getTime();
		customTitleEl.textContent = countdownTitle;
		updateCountdownAndUI();
	}
}

function resetCountdown() {
	countdownContainer.classList.remove('show-container');
	countdownCompleteContainer.classList.remove('show-container');
	inputContainer.classList.add('show-container');

	clearInterval(countdownActive);
	localStorage.removeItem('countdown');
	countdownTitle = '';
	countdownDate = '';
}

function restoreCountdownIfAvailable() {
	if (localStorage.getItem('countdown')) {
		inputContainer.classList.remove('show-container');
		savedCountdown = JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate).getTime();
		customTitleEl.textContent = countdownTitle;
		updateCountdownAndUI();
	}
}

// EVENT LISTENERS
form.addEventListener('submit', updateCountdown);
resetTimerBtn.addEventListener('click', resetCountdown);
newCountdownBtn.addEventListener('click', resetCountdown);

// ON LOAD
restoreCountdownIfAvailable();
