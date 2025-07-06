/// <reference lib="deno.unstable" />

import { Plugin } from "$fresh/server.ts";
import { log } from "../log.ts";
import { clearDb, startDb } from "../storage/db.ts";
import { createOutDirIfNotExists } from "../storage/disk.ts";
import { contentBuilder } from "./build.ts";
import { ConfigSetter, setConfig } from "./config.ts";

startDb(await Deno.openKv());

export default (config: ConfigSetter): Plugin => {
  setConfig(config);

  return {
    name: "foblog",

    buildStart: async (freshConfig) => {
      setConfig(config, freshConfig);

      log("Building...");
      await clearDb();
      await createOutDirIfNotExists();

      await contentBuilder.build(true);
    },
  };
};
