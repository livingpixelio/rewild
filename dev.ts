#!/usr/bin/env -S deno run -A --watch=static/,routes/,digest.txt

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import "$std/dotenv/load.ts";
import { contentBuilder } from "foblog";

// @TODO: the awkwardness of this could be avoided by running from a middleware
// that is specified by the plugin rather than from a .
if (!Deno.args.includes("build")) {
  await contentBuilder.build();
  contentBuilder.watch((digest, watcher) => {
    Deno.writeTextFile("digest.txt", digest);
    watcher.close();
  });
}

await dev(import.meta.url, "./main.ts", config);
