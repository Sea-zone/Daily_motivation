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
    clearSearchInput(); // Clear the search input after performing the search
  });

// Function to clear the search input field
function clearSearchInput() {
  const searchInput = document.querySelector(".hello");
  searchInput.value = ""; // Clear the input field
}
// Event listener for clearing the search input
document.addEventListener("DOMContentLoaded", clearSearchInput);

// Function to load a lazy background image
function loadLazyBackgroundImage() {
  const lazyBackgrounds = document.querySelectorAll(".image-overlay");
  lazyBackgrounds.forEach((lazyBackground) => {
    if (
      lazyBackground.dataset.src &&
      lazyBackground.style.backgroundImage === "none"
    ) {
      lazyBackground.style.backgroundImage = `url(${lazyBackground.dataset.src})`;
    }
  });
}
// Function to generate shortcut icons
async function generateShortcutIcons() {
  const container = document.getElementById("shortcut-container");
  const links = document.querySelectorAll("a"); // get all anchor elements

  // Loop through the links and create shortcuts
  for (const link of links) {
    try {
      const url = new URL(link.href);
      const websiteUrl = url.origin;
      const metadataUrl = `${websiteUrl}/.well-known/open-graph.json`;

      // Fetch website metadata using the Open Graph Protocol
      const response = await fetch(metadataUrl);

      if (response.ok) {
        const metadata = await response.json();

        const shortcutLink = document.createElement("a");
        shortcutLink.href = websiteUrl;
        shortcutLink.target = "_blank";

        const shortcutImage = document.createElement("img");
        shortcutImage.src = metadata.icons
          ? metadata.icons[0].url
          : "default-icon.png";

        const shortcutName = document.createElement("p");
        shortcutName.textContent = metadata.title || websiteUrl;

        shortcutLink.appendChild(shortcutImage);
        shortcutLink.appendChild(shortcutName);

        container.appendChild(shortcutLink);
      } else {
        // Handle the case where metadata cannot be fetched
        console.error(
          `Error fetching metadata for ${websiteUrl}: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      // Handle error if the URL cannot be parsed or other errors occur
      console.error(`Error processing ${link.href}: ${error.message}`);
    }
  }
}
// Get the current active tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  const tabUrl = tab.url;

  // Create an image element for the favicon
  const faviconImg = document.createElement("img");
  faviconImg.src = `https://www.google.com/s2/favicons?domain=${tabUrl}`;

  // Add the favicon image to the container
  const faviconContainer = document.getElementById("favicon-container");
  faviconContainer.appendChild(faviconImg);
});

// Call the function to generate shortcut icons when the page loads
window.addEventListener("load", generateShortcutIcons);

document.addEventListener("DOMContentLoaded", loadLazyBackgroundImage);
