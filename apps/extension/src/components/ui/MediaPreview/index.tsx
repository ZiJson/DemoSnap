import { useEffect, useRef } from "react";

interface MediaPreviewProps {
  stream: MediaStream | null;
  recording: boolean;
}

const MediaPreview = ({ stream }: MediaPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      className={`aspect-video w-full rounded-xl bg-black shadow ${stream ? "border-red-500" : ""}`}
      muted
    />
  );
};

export default MediaPreview;
