import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import wordfresh from "wordfresh";

export default defineConfig({
  plugins: [
    tailwind(),
    wordfresh((config) => ({
      ...config,

      // purgeAll: true,

      siteTitle: "OptOut",
      siteDescription: "A experiment in rewilding the internet",
      siteUrl: "https://optout.social",
      siteMainAuthor: {
        name: "Casey A. Ydenberg",
      },
    })),
  ],
});
