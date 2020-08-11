// Get Quote From API
async function getQuote() {
  const apiUrl = 'https://icanhazdadjoke.com';
  try {
    const response = await fetch(apiUrl, 
      {method:'GET',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json'
       }
      });
    const data = await response.json();
    console.log(data);
  } catch(err) {
    // getQuote();
    console.log('No quote, oops!', err);
  }
}

// On Load
getQuote();