"use server";

import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";

const services = await getServices({
  region: "us-east1",
  compatibleOnly: true,
});

const serviceName = services[0]?.serviceName;

export const renderMedia = async () => {
  console.log(123);
  console.log(serviceName);
  const result = await renderMediaOnCloudrun({
    serviceName,
    region: "us-east1",
    serveUrl:
      "https://storage.googleapis.com/remotioncloudrun-ryhq72q206/sites/my-video/index.html",
    composition: "MyComp",
    inputProps: {},
    codec: "h264",
  });

  if (result.type === "success") {
    console.log(result.bucketName);
    console.log(result.renderId);
  }
};
