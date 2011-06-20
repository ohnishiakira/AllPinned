function makePinned(tab) {
  if (tab.pinned == false) {
    chrome.tabs.update(tab.id, {pinned: true});
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  makePinned(tab);
});
chrome.tabs.onCreated.addListener(makePinned);
