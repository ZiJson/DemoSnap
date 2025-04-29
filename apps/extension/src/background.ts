import browser from "webextension-polyfill";

console.log("Hello from the background!");
browser.runtime.onInstalled.addListener(details => {
  console.log("Extension installed:", details);
});

let streamIdCache: string | null = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_DESKTOP_CAPTURE" && sender.tab) {
    chrome.desktopCapture.chooseDesktopMedia(
      ["tab", "screen", "window", "audio"],
      sender.tab,
      streamId => {
        streamIdCache = streamId;
        sendResponse({ streamId });
      }
    );
    return true; // 必須 return true 讓 sendResponse 是 async 的
  }
  if (message.type === "GET_") {
    sendResponse({ streamId: streamIdCache });
    return true; // 必須 return true 讓 sendResponse 是 async 的
  }
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

setInterval(() => {
  console.log("streamIdCache", streamIdCache);
}, 1000);
