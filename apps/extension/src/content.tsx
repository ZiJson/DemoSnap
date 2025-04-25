import React from "react";
import ReactDOM from "react-dom/client";
import App from "./main";

// 创建一个新的容器 div 并附加 Shadow DOM
const container = document.createElement("div");
container.id = "DemoSnap-plugin";

// 插入到 <body> 的父层（通常是 <html>）
document.body.parentNode?.appendChild(container);
console.log("✅ content.js loaded");

// 创建 Shadow DOM
const shadowRoot = container.attachShadow({ mode: "open" });

// 注入 CSS 样式
const styleLink = document.createElement("link");
styleLink.setAttribute("rel", "stylesheet");
styleLink.setAttribute("href", chrome.runtime.getURL("extension.css"));
shadowRoot.appendChild(styleLink);

// 渲染 React 应用
ReactDOM.createRoot(shadowRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
