/// <reference lib="deno.unstable" />

// import { path } from "../deps.ts";

import { Plugin } from "$fresh/server.ts";
import { clearDb, startDb } from "../storage/db.ts";
import { build } from "./build.ts";
import { ConfigSetter, setConfig } from "./config.ts";

startDb(await Deno.openKv());

export default (config: ConfigSetter): Plugin => {
  setConfig(config);

  return {
    name: "foblog",

    buildStart: async () => {
      // await clearDb();
      await build(true);
    },
  };
};
