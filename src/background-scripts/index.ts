import CambridgeEnglish from "./scrapers/dictionaries/CambridgeEnglish";
import ImageScraper from "./scrapers/ImageScraper";
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.action === "translate") {
    if (request.dictionary === "CambridgeEnglish") {
      CambridgeEnglish(request.search).then(searchResults => sendResponse(searchResults));
    }
  } else if (request.action === "image") {
    ImageScraper(request.search).then(ImageURLSearchResults => sendResponse(ImageURLSearchResults));
  }
  return true;
});

