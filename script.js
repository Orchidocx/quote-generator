const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
// const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote From API
async function getQuote() {
  const apiUrl = 'https://icanhazdadjoke.com';
  try {
    const response = await fetch(apiUrl, {headers: {'Accept': 'application/json'}});
    const data = await response.json();
    const {joke} = data;
    if(joke.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = joke;
  } catch(err) {
    getQuote();
  }
}




// On Load
getQuote();