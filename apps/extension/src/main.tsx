import { useEffect, useState } from "react";
import Widget from "./pages/Widget";
import "./main.css";

const App = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      console.log("插入 widget 元素...");

      if (message.action === "open_widget") {
        setOpen(pre => !pre);
      }
    };
    console.log("监听 runtime.onMessage...");
    chrome.runtime.onMessage.addListener(handler);

    // 🧹 清除监听器
    return () => {
      console.log("清除监听器...");
      chrome.runtime.onMessage.removeListener(handler);
    };
  }, []);
  return <div>{open && <Widget />}</div>;
};

export default App;
