import cambridgeEnglish from "./scrapers/dictionaries/cambridgeEnglish";
import imageScraper from "./scrapers/imageScraper";
import {addCard} from "./ankiController";
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.action === "translate") {
    if (request.dictionary === "CambridgeEnglish") {
      cambridgeEnglish(request.search).then(searchResults => sendResponse(searchResults));
    }
  } else if (request.action === "image") {
    imageScraper(request.search).then(imageURLSearchResults => sendResponse(imageURLSearchResults));
  } else if (request.action === "addCardToAnki") {
    addCard(request.frontCardHTML, request.backCardHTML).then(() => sendResponse("add card to anki successfully"));
  }
  return true;
});

