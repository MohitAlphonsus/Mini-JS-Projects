async function getQuotes() {
	const apiurl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
	const response = await fetch(apiurl);
	const data = await response.json();
	console.log(data);
}

// getQuotes();

// Every man dies. Not every man really lives
//"Being a sex symbol has to do with an attitude, not looks. Most men think it's looks, most women know otherwise."
//Kathleen Turner
