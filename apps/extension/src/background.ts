import browser from "webextension-polyfill";

console.log("Hello from the background!");
browser.runtime.onInstalled.addListener(details => {
  console.log("Extension installed:", details);
});

chrome.action.onClicked.addListener(async tab => {
  console.log("click");
  if (!tab.id) return;

  // 注入 content script（如果未注入）
  // await chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ["src/content.js"],
  // });

  // 发一条消息告诉 content script：可以打开 widget 了
  chrome.tabs.sendMessage(tab.id, { action: "open_widget" });
});
