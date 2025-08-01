// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_slug_ from "./routes/[...slug].tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $about from "./routes/about.tsx";
import * as $blog_slug_ from "./routes/blog/[slug].tsx";
import * as $blog_index from "./routes/blog/index.tsx";
import * as $feed_json from "./routes/feed.json.ts";
import * as $foblog from "./routes/foblog.tsx";
import * as $image_slug_ from "./routes/image/[slug].ts";
import * as $index from "./routes/index.tsx";
import * as $BannerImage from "./islands/BannerImage.tsx";
import * as $FeatureList from "./islands/FeatureList.tsx";
import * as $HalfCut from "./islands/HalfCut.tsx";
import * as $Hero from "./islands/Hero.tsx";
import * as $Network from "./islands/Network.tsx";
import * as $Shrooms from "./islands/Shrooms.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[...slug].tsx": $_slug_,
    "./routes/_404.tsx": $_404,
    "./routes/about.tsx": $about,
    "./routes/blog/[slug].tsx": $blog_slug_,
    "./routes/blog/index.tsx": $blog_index,
    "./routes/feed.json.ts": $feed_json,
    "./routes/foblog.tsx": $foblog,
    "./routes/image/[slug].ts": $image_slug_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/BannerImage.tsx": $BannerImage,
    "./islands/FeatureList.tsx": $FeatureList,
    "./islands/HalfCut.tsx": $HalfCut,
    "./islands/Hero.tsx": $Hero,
    "./islands/Network.tsx": $Network,
    "./islands/Shrooms.tsx": $Shrooms,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
