export * from "./lib/index.ts";

export { clearDb } from "./storage/db.ts";
export type { FoblogPluginConfig } from "./plugin/index.ts";
export { setupListener } from "./plugin/build.ts";

import foblog from "./plugin/plugin.ts";
export default foblog;
