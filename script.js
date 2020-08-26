const body = document.getElementsByTagName('body')[0];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let currentStyle = 1;

function showLoadingSpinner() {
  loader.hidden= false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote(counter = 0) {
  showLoadingSpinner();
  randomizeColor();
  const apiUrl = 'https://icanhazdadjoke.com';
  try {
    ++counter;
    const response = await fetch(apiUrl, {headers: {'Accept': 'application/json'}});
    const data = await response.json();
    const {joke} = data;
    if(joke.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = joke;
    removeLoadingSpinner();
  } catch(err) {
    if (counter < 10) {
      getQuote(counter);
    } else {
      quoteText.innerText = 'Could not retrieve quote. Please try again later.';
      removeLoadingSpinner();
    }
  }
}

function randomizeColor() {
  let clr = Math.floor(1 + Math.random()*6);
  while(clr === currentStyle) {
    clr = Math.floor(1 + Math.random()*6);
  }
  body.classList.replace(`bg${currentStyle}`, `bg${clr}`);
  twitterBtn.classList.replace(`color${currentStyle}`, `color${clr}`);
  currentStyle = clr;
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