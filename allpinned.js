function makePinned(tab) {
  if (tab.pinned == false) {
    chrome.tabs.update(tab.id, {pinned: true});
  }
}

var currentTab = null;
chrome.tabs.getSelected(null, function(tab) {
  currentTab = tab;
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
  chrome.tabs.get(tabId, function(tab) {
    currentTab = tab;
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  makePinned(tab);
});

chrome.tabs.onCreated.addListener(function(tab) {
  makePinned(tab);
  chrome.tabs.move(tab.id, {index: currentTab.index + 1});
});
