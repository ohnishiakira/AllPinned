function makePinned(tab) {
  if (tab.pinned === false) {
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

chrome.tabs.onCreated.addListener(function(tab) {
  makePinned(tab);
  
  if (tab.url !== "chrome://newtab/") {
    chrome.history.getVisits({url: tab.url}, function(visitItems) {
      console.log(visitItems);
      if (visitItems.length === 0) {
	return false;
      }

      var visitItem = visitItems[visitItems.length - 1];

      console.log(visitItem.transition);

      switch (visitItem.transition) {
	case "link":
	  chrome.tabs.move(tab.id, {index: currentTab.index + 1});
	  break;
	case "start_page":
	  // a link opened from other application
	default:
	  break;
      }
    });
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  makePinned(tab);
});
