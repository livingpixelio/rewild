import { FobHead } from "foblog";
import { PageProps } from "$fresh/server.ts";

import { HeroFullScreen } from "../islands/Hero.tsx";

export default function Error404({ url }: PageProps) {
  return (
    <>
      <FobHead url={url} pageTitle="Page not found" />
      <HeroFullScreen>
        <h1 class="text-4xl font-bold text-success">
          404
        </h1>
        <p class="my-4">
          Not all those who wonder the internet are lost.
        </p>
        <p class="mt-4">
          <a class="text-xl underline" href="/">Back home</a>
        </p>
      </HeroFullScreen>
    </>
  );
}
