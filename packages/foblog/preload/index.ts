export type { Preloader } from "./types.ts";

import { FreshContext } from "$fresh/server.ts";
import { warn } from "../log.ts";
import { MdastNodeTy } from "../parsers/index.ts";
import { config } from "../plugin/config.ts";
import { preloadAttachmentImages, preloadXLinks } from "./preloaders.ts";
import { PreloadAssembler, runPreloads } from "./process.ts";
import { Preloader, PreloadFulfilled } from "./types.ts";

const preloaders: Preloader[] = [
  preloadXLinks,
  preloadAttachmentImages,
  ...config.preloaders,
];

const preloadAssember = PreloadAssembler(preloaders);

export const assemblePreloads = async (
  content: MdastNodeTy.Root,
): Promise<PreloadFulfilled[]> => {
  const preloads = preloadAssember.preloadsForNodes(content, true);
  const all = await runPreloads(preloads);

  const errors = all.filter((preload) => preload.preloadStatus === "error");
  if (errors.length) {
    warn(`Some preloads failed: ${errors.map((err) => err.error).join(",")}`);
  }

  return all.filter((preload) => preload.preloadStatus === "fulfilled");
};

export const transformNode = preloadAssember.transformNode;
