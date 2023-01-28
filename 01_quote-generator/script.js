'use strict';

const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const btnNewQuote = document.getElementById('new-quote');
const btnTweetQuote = document.getElementById('tweet-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
	quoteContainer.style.display = 'none';
}

function removeLoadingSpinner() {
	quoteContainer.style.display = 'flex';
	loader.style.display = 'none';
}

function newQuote() {
	showLoadingSpinner();
	// picking random quote from api array
	const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	if (!randomQuote.author) quoteAuthor.textContent = 'Unknown';

	quoteAuthor.textContent = randomQuote.author;
	if (randomQuote.text.length > 120) quote.classList.add('long-quote');
	else quote.classList.remove('long-quote');

	// set quote
	quote.textContent = randomQuote.text;

	removeLoadingSpinner();
}

async function getQuotes() {
	showLoadingSpinner();
	const apiurl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
	const response = await fetch(apiurl);
	apiQuotes = await response.json();

	newQuote();
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${quoteAuthor.textContent}`;
	window.open(twitterUrl, '_blank');
}

btnNewQuote.addEventListener('click', newQuote);
btnTweetQuote.addEventListener('click', tweetQuote);

getQuotes();
