import imageScraper from "./scrapers/imageScraper";
import {addCard, chooseDeck, chosenDeck, getDeckNames} from "./ankiController";
import translate from "./translate";
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.action === "translate") {
    translate(request.search, request.dictionaries).then(allDictionariesSearchResults => sendResponse(allDictionariesSearchResults));
  } else if (request.action === "image") {
    imageScraper(request.search).then(imageURLSearchResults => sendResponse(imageURLSearchResults));
  } else if (request.action === "addCardToAnki") {
    addCard(request.frontCardHTML, request.backCardHTML).then((response) => sendResponse(response));
  } else if (request.action === "getDeckNames") {
    getDeckNames().then(response => sendResponse(response));
  } else if (request.action === "getChosenDeck") {
    sendResponse(chosenDeck);
  } else if (request.action === "chooseDeck") {
    chooseDeck(request.deckName).then(response => sendResponse(response));
  }
  return true;
});

