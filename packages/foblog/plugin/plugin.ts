/// <reference lib="deno.unstable" />

// import { path } from "../deps.ts";

import { Plugin } from "$fresh/server.ts";
import { startDb } from "../storage/db.ts";
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

      await createOutDirIfNotExists();

      await contentBuilder.build(true);
    },
  };
};
