let popup: HTMLIFrameElement = document.createElement("iframe");
let selectedText: Selection | string | null = "";

const initPopup = () => {
  popup.src = chrome.runtime.getURL("popup/index.html");
  popup.style.width = "580px";
  popup.style.height = "375px";
  popup.style.position = "fixed";
  popup.style.right = "0";
  popup.style.top = "0";
  popup.style.zIndex = "1000000000";
  popup.style.transform = "scale(0.85)";
  popup.style.transformOrigin = "top right";
  popup.style.backgroundColor = "white";
  popup.style.visibility = "hidden";
  document.body.appendChild(popup);
};

const openPopup = () => {

  selectedText = window.getSelection();
  if (selectedText) {
    selectedText = selectedText.toString();
    if (selectedText.length > 0 && selectedText.length < 100) {
      // reload iframe
      popup.src = popup.src;

      popup.style.visibility = "visible";
    }
  }
};

initPopup();
window.addEventListener("dblclick", openPopup);
window.addEventListener("mouseup", openPopup);
window.addEventListener("mousedown", () => {
  popup.style.visibility = "hidden";
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    sendResponse(selectedText);
  }
});


export {};
