async function getQuotes() {
	const apiurl = '';
	const response = await fetch(apiurl);
	const data = await response.json();
	console.log(data);
}
