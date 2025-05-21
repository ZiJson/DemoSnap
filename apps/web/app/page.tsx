"use client";

import { Player, PlayerRef } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useRef, useState } from "react";
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
  const playerRef = useRef<PlayerRef>(null);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div className="">
      <div className="mx-auto max-w-screen-md">
        <div className="rounded-geist mt-16 mb-10 overflow-hidden shadow-2xl">
          <Player
            ref={playerRef}
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
        <button
          onClick={() => playerRef.current?.toggle()}
          className="cursor-pointer rounded-full bg-black px-4 py-2 text-white"
        >
          toggle
        </button>
      </div>
    </div>
  );
};

export default Home;
