import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import foblog from "./packages/foblog/plugin/mod.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    foblog((config) => ({
      ...config,

      siteTitle: "OptOut",
      siteDescription: "A experiment in rewilding the internet",
      siteUrl: "https://optout.social",
      siteMainAuthor: {
        name: "Casey A. Ydenberg",
      },
    })),
  ],
});
