import CambridgeEnglish from "./scrapers/dictionaries/CambridgeEnglish";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.action + " " + request.search + " " + request.dictionary);
  CambridgeEnglish(request.search);
  sendResponse("success");
});

