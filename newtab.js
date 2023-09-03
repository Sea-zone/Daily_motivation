async function fetchQuote() {
  const response = await fetch("https://api.quotable.io/random", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

// Function to perform a Google search
function performGoogleSearch(query) {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;
  window.location.href = googleSearchUrl;
}

// Display a quote on the new tab page
async function displayQuote() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  const quoteData = await fetchQuote();
  quoteElement.textContent = quoteData.content;
  authorElement.textContent = "-" + quoteData.author;
}

// Copy quote to clipboard
function copyToClipboard() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  const textToCopy = `"${quoteElement.textContent}" - ${authorElement.textContent}`;
  const tempInput = document.createElement("textarea");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Copied to clipboard");
}

// Event listeners
document.addEventListener("DOMContentLoaded", displayQuote);
document
  .getElementById("copy-button")
  ?.addEventListener("click", copyToClipboard);

async function fetchImage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/?client_id=don5E9aq9rOpeo37Ajz7ZxkLnH1fbSVE-Jr5TNWHF1A",
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}

async function changeBg() {
  try {
    const quoteData = await fetchImage();

    document.body.style.backgroundImage = `url(${
      quoteData[Math.floor(Math.random() * 10)].links["download"]
    }})`;
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", changeBg);

// Event listener for the search form
document
  .querySelector(".input-banner")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.querySelector(".hello").value;
    performGoogleSearch(searchInput); // Call the Google search function
  });
