'use strict';
const toggleSwitch = document.getElementById('toggle-switch');

function switchTheme(event) {
	if (event.target.checked)
		document.documentElement.setAttribute('data-theme', 'dark');
	else document.documentElement.setAttribute('data-theme', 'light');
}

toggleSwitch.addEventListener('click', switchTheme);
