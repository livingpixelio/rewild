import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import foblog from "foblog";

export default defineConfig({
  plugins: [
    tailwind(),
    foblog((config) => ({
      ...config,

      siteTitle: "Rewild",
      siteDescription: "Tech that serves humans, not the other way around",
      siteUrl: "https://letsrewildthe.net",
      siteMainAuthor: {
        name: "Casey A. Ydenberg",
      },
    })),
  ],
});
