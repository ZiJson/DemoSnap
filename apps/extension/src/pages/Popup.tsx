import { useEffect, useRef, useState } from "react";

export default function Popup() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  chrome.windows.create({
    url: chrome.runtime.getURL("src/widget.html"),
    type: "popup",
    width: 400,
    height: 600,
  });

  const startCapture = () => {
    chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], streamId => {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            // 非标准字段，需断言
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: streamId,
            },
          } as any,
        })
        .then(stream => {
          // ✅ 这是用户选定的标签页的画面
          if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStream(stream);
          }
        });
    });
    // chrome.tabCapture.capture({ video: true, audio: false }, stream => {
    //   if (stream && videoRef.current) {
    //     videoRef.current.srcObject = stream;
    //     videoRef.current.play();
    //     setStream(stream);
    //   }
    // });
  };

  return (
    <div className="h-[800px] w-[500px] p-2">
      <h2 className="mb-2 text-base font-bold">🎥 实时预览</h2>
      <video ref={videoRef} className="h-auto w-full rounded shadow" muted />
      <button onClick={startCapture} className="mt-2 rounded bg-blue-600 px-3 py-1 text-white">
        开始预览
      </button>
    </div>
  );
}
