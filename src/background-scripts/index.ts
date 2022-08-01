chrome.runtime.onMessage.addListener((request, callback) => {
  console.log(request.action)
});

export {}