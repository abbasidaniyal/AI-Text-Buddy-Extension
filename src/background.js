// Background script for Chrome extension
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu items
  chrome.contextMenus.create({
    id: "fix-with-ai",
    title: "Fix with AI",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "rewrite-with-ai", 
    title: "Rewrite with AI",
    contexts: ["editable"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fix-with-ai" || info.menuItemId === "rewrite-with-ai") {
    // Send message to content script instead of injecting inline script
    chrome.tabs.sendMessage(tab.id, {
      action: "processText",
      type: info.menuItemId
    });
  }
});