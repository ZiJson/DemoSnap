"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { z } from "zod";
import {
  defaultMyCompProps,
  CompositionProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
// import { RenderControls } from "../components/RenderControls";
// import { Spacing } from "../components/Spacing";
// import { Tips } from "../components/Tips";
import { Main } from "../remotion/MyComp/Main";
import { renderMedia } from "../server-action";

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div>
      <div className="m-auto mb-5 max-w-screen-md">
        <div className="rounded-geist mt-16 mb-10 overflow-hidden shadow-[0_0_200px_rgba(0,0,0,0.15)]">
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
              // but not over inline styles
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
        {/* <RenderControls text={text} setText={setText} inputProps={inputProps}></RenderControls>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Tips></Tips> */}
        <button onClick={renderMedia}>Render</button>
      </div>
    </div>
  );
};

export default Home;
