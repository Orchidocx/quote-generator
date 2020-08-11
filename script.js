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


function tweetQuote() {
  const quote = quoteText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - Dad - icanhazdadjoke.com`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();