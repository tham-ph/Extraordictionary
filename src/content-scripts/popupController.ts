let popup: HTMLIFrameElement = document.createElement("iframe");
let selectedText: Selection | null;

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
};

const openPopup = () => {
  setTimeout(() => {
    selectedText = window.getSelection();
    if (selectedText) {
      if (selectedText.toString().length > 0 && selectedText.toString().length < 100) {
        // reload iframe
        popup.src = popup.src;

        popup.style.visibility = "visible";

        //display popup near selected text

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
    }
  }, 500);

};

const closePopup = () => {
  popup.style.visibility = "hidden";
  window.getSelection()?.empty();
}

export {
  popup,
  selectedText,
  initPopup,
  openPopup,
  closePopup
}