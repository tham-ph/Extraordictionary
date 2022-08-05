let popup: HTMLIFrameElement = document.createElement("iframe");
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

window.addEventListener("dblclick", () => {
  let selectedText: Selection | string | null = window.getSelection();
  if (selectedText) {
    selectedText = selectedText.toString();
    if (selectedText.length > 0) {
      popup.style.visibility = "visible";
    }
  }
});

window.addEventListener("mouseup", () => {
  let selectedText: Selection | string | null = window.getSelection();
  if (selectedText) {
    selectedText = selectedText.toString();
    if (selectedText.length > 0) {
      popup.style.visibility = "visible";
    }
  }
});
window.addEventListener("mousedown", () => {
  popup.style.visibility = "hidden";
});


export {}