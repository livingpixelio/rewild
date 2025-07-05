import { FreshContext } from "$fresh/server.ts";
import { isLeaf } from "../parsers/index.ts";
import { MdastNodeTy } from "../parsers/markdown/index.ts";
import { ResourceFinder } from "../plugin/build.ts";
import {
  Preloader,
  PreloadErrored,
  PreloadFulfilled,
  PreloadPending,
} from "./types.ts";

export const PreloadAssembler = (preloaders: Preloader[]) => {
  const preloadsForNodes = (
    node: MdastNodeTy.MdastNode,
    recur?: boolean,
  ): PreloadPending[] => {
    const resultFromPrimaryNode = preloaders.reduce((acc, preloader) => {
      const result = preloader(node);
      if (!result) return acc;
      if (Array.isArray(result)) return [...acc, ...result];
      return [...acc, result];
    }, [] as PreloadPending[]);

    if (recur && !isLeaf(node)) {
      return node.children.reduce((acc, child) => {
        return [...acc, ...preloadsForNodes(child, true)];
      }, resultFromPrimaryNode);
    }

    return resultFromPrimaryNode;
  };

  const transformNode = <NodeTy extends MdastNodeTy.MdastNode>(
    node: NodeTy,
    fulfilled: Array<PreloadFulfilled>,
  ) => {
    return preloadsForNodes(node, false).reduce((node, preload) => {
      const key = preload.key;
      const item = fulfilled.find((item) => item.key === key);
      if (!item) return node;

      if (item.data.type !== node.type) return node;
      return item.data as NodeTy;
    }, node);
  };

  return {
    preloadsForNodes,
    transformNode,
  };
};

export const runPreloads = async (
  preloads: PreloadPending[],
): Promise<Array<PreloadFulfilled | PreloadErrored>> => {
  const promises = preloads.map((preload) => preload.query());

  return Promise.allSettled(promises).then((settled) => {
    return settled.map((promise, idx) =>
      promise.status === "fulfilled"
        ? {
          key: preloads[idx].key,
          preloadStatus: "fulfilled",
          data: promise.value,
        }
        : {
          key: preloads[idx].key,
          preloadStatus: "error",
          error: promise.reason,
        }
    );
  });
};
