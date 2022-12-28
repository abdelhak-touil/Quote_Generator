const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading

function loading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// // show quotes from local database

// function newQuotes() {
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }

// show new quote

function newQuote() {
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   console.log(quote);
  // check if author field is blank and replace it with 'unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }


  // check quote lenght to determine styling

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

// get quotes from API

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const reponse = await fetch(apiUrl);
    apiQuotes = await reponse.json();
    // console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    // catch error here
  }
}

// tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event listeners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
// loading();
// newQuotes();
