/// <reference lib="deno.unstable" />

// import { path } from "../deps.ts";

import { Plugin } from "$fresh/server.ts";
import { startDb } from "../db/engine.ts";
import { ConfigSetter, setConfig } from "./config.ts";

startDb(await Deno.openKv());

const foblog = (config: ConfigSetter): Plugin => {
  const _resolvedConfig = setConfig(config);

  return {
    name: "foblog",

    buildStart: async () => {
      // silence
    },
  };
};

export default foblog;
