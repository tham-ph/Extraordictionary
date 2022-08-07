let popup: HTMLIFrameElement = document.createElement("iframe");
let selectedText: Selection | null;

const initPopup = () => {
  popup.src = chrome.runtime.getURL("popup/index.html");
  popup.style.width = "580px";
  popup.style.height = "375px";
  popup.style.position = "absolute";
  popup.style.right = "0";
  popup.style.top = "0";
  popup.style.zIndex = "2000";
  popup.style.transform = "scale(0.85)";
  popup.style.transformOrigin = "top right";
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
        if (selectedTextPosition.left + parseInt(popup.style.width) > window.innerWidth) {
          popup.style.left = (selectedTextPosition.left - parseInt(popup.style.width)).toString() + "px";
        } else {
          popup.style.left = selectedTextPosition.left.toString() + "px";
        }
        if (selectedTextPosition.top + parseInt(popup.style.height) - 30 > window.innerHeight) {
          popup.style.top = (selectedTextPosition.top - parseInt(popup.style.height) + window.scrollY).toString() + "px";
        } else {
          popup.style.top = (selectedTextPosition.top + window.scrollY).toString() + "px";
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