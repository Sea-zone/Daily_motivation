async function fetchQuote() {
  const response = await fetch("https://api.quotable.io/random", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

// Display a quote on the new tab page
async function displayQuote() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  const quoteData = await fetchQuote();
  console.log(quoteData);
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
  alert("copied to clipboard");
}

// Event listeners
document?.addEventListener("DOMContentLoaded", displayQuote);
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
document?.addEventListener("DOMContentLoaded", changeBg);
