/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { contentBuilder } from "foblog";
import { clearDb, startDb } from "./packages/foblog/storage/db.ts";

// temporary: need to refactor ContentBuilder
startDb(await Deno.openKv());

await clearDb();
await contentBuilder.build();

await start(manifest, config);
