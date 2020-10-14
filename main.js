const twitterButton = document.querySelector('#js-tweet');
const spinner = document.querySelector('#js-spinner');
const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);

const endpoint = 'https://api.quotable.io/random';

async function getQuote() {
  spinner.classList.remove('hidden');
  newQuoteButton.disabled = true;

  try {
    const response = await fetch(endpoint); 
    if(!response.ok) {
      throw Error(response.statusText)
    }
    const json = await response.json();
    displayQuote(json.content);
    const author = document.querySelector('.author');
    author.textContent = '- ' + json.author;
    setTweetButton(json.content, json.author);
  } catch(err) {
    console.log(err);
    alert('Failed to fetch new quote');
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add('hidden');
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}

function setTweetButton(quote, author) {
  twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - ${author}`);
}

getQuote();