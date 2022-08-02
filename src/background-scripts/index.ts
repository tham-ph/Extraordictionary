import CambridgeEnglish from "./scrapers/dictionaries/CambridgeEnglish";
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.action === "translate") {
    if (request.dictionary === "CambridgeEnglish") {
      CambridgeEnglish(request.search).then(searchResults => sendResponse(searchResults));
    }
  }
  return true;
});

