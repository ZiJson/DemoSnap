import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import MediaPreview from "@/components/ui/MediaPreview";
import { useMediaCapture } from "@/hooks";
import { motion } from "framer-motion";

const Widget = () => {
  const { startCapture, stopCapture, stream, startRecording, stopRecording, videoUrl, recording } =
    useMediaCapture();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="fixed top-2 right-2 z-[9999] h-auto w-md"
    >
      <Card className="size-full p-3 shadow-2xl">
        <MediaPreview stream={stream} recording={recording} />
        <Button
          onClick={stream ? stopCapture : startCapture}
          variant={stream ? "destructive" : "default"}
        >
          {stream ? "Stop" : "Start"}
        </Button>
        {stream && (
          <Button onClick={recording ? stopRecording : startRecording}>
            {recording ? "Stop" : "Record"}
          </Button>
        )}
        {videoUrl && (
          <a href={videoUrl} download>
            {videoUrl}
          </a>
        )}
      </Card>
    </motion.div>
  );
};

export default Widget;
