
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.action);
  sendResponse("heelo");
});

export {}