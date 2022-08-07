import cambridgeEnglish from "./scrapers/dictionaries/cambridgeEnglish";
import imageScraper from "./scrapers/imageScraper";
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.action === "translate") {
    if (request.dictionary === "CambridgeEnglish") {
      cambridgeEnglish(request.search).then(searchResults => sendResponse(searchResults));
    }
  } else if (request.action === "image") {
    imageScraper(request.search).then(imageURLSearchResults => sendResponse(imageURLSearchResults));
  }
  return true;
});

