import { useEffect, useRef, useState } from "react";
import Widget from "./pages/Widget";
import { AnimatePresence } from "framer-motion";
import "./main.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setOpen(false); // 點擊外面 -> 關閉
      }
    };
    console.log("监听 runtime.onMessage...");
    chrome.runtime.onMessage.addListener(handler);
    // document.addEventListener("click", handleClickOutside, true);

    // 🧹 清除监听器
    return () => {
      console.log("清除监听器...");
      chrome.runtime.onMessage.removeListener(handler);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div className="dark" ref={widgetRef}>
      <AnimatePresence>{open && <Widget />}</AnimatePresence>
    </div>
  );
};

export default App;
