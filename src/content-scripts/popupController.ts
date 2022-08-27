
let popup: HTMLIFrameElement = document.createElement("iframe");

let selectedText: Selection | null;

let popupOption = 2;

const initPopup = () => {
  popup.src = chrome.runtime.getURL("popup/index.html");
  popup.style.width = "580px";
  popup.style.height = "375px";
  popup.style.left = "0";
  popup.style.top = "0";
  popup.style.position = "absolute";
  popup.style.zIndex = "2000";
  popup.style.backgroundColor = "white";
  popup.style.visibility = "hidden";
  document.body.appendChild(popup);
  chrome.runtime.sendMessage({action: "getPopupOption"}, response => {
    popupOption = response;
  });
};

const openPopup = () => {
  setTimeout(() => {
    selectedText = window.getSelection();
    if (selectedText && selectedText.toString().length > 0 && selectedText.toString().length < 100) {
      chrome.runtime.sendMessage({
        action: "translate",
        search: selectedText.toString(),
        dictionaries: ["cambridgeEnglish", "oxfordEnglish"],
      }, response => {
        if ((popupOption == 2 && response.length > 0) || popupOption == 1) {
          // reload iframe
          popup.src = popup.src;

          popup.style.visibility = "visible";

          //display popup near selected text

          // @ts-ignore
          const selectedTextPosition: DOMRect = selectedText.getRangeAt(0).getBoundingClientRect();
          const posXAtCenter = selectedTextPosition.left + selectedTextPosition.width / 2;
          const posYAtTop = selectedTextPosition.top;
          const posYAtBottom = selectedTextPosition.top + selectedTextPosition.height;
          const popupWidth = parseInt(popup.style.width);
          const popupHeight = parseInt(popup.style.height);

          if (posXAtCenter + popupWidth / 2 > window.innerWidth) {
            popup.style.left = (posXAtCenter - popupWidth).toString() + "px";
          } else if (posXAtCenter - popupWidth / 2 < 0) {
            popup.style.left = (posXAtCenter).toString() + "px";
          } else {
            popup.style.left = (posXAtCenter - popupWidth / 2).toString() + "px";
          }

          if (posYAtBottom + popupHeight > window.innerHeight && scrollY > popupHeight) {
            popup.style.top = (posYAtTop - popupHeight - 5 + window.scrollY).toString() + "px";
          } else {
            popup.style.top = (posYAtBottom + 5 + window.scrollY).toString() + "px";
          }

        }
      });

    }
  }, 500);

};

const closePopup = () => {
  popup.style.visibility = "hidden";
  window.getSelection()?.empty();
}


export {
  popup,
  initPopup,
  openPopup,
  closePopup,
  selectedText
}