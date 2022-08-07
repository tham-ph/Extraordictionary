import {selectedText, initPopup, openPopup, closePopup} from "./popupController";

initPopup();
window.addEventListener("dblclick", openPopup);
window.addEventListener("mouseup", openPopup);
window.addEventListener("mousedown", closePopup);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    if (selectedText) {
      sendResponse(selectedText.toString());
    } else {
      sendResponse("");
    }
  }
});

