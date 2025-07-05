import { Preloader } from "./types.ts";
import { config } from "../plugin/config.ts";

export const preloadXLinks: Preloader = (node) => {
  if (node.type !== "xlink") return null;

  const xlinkNode = node;

  return {
    key: `xlink:${xlinkNode.filename}`,
    query: (_req, _ctx, findResources) => {
      const resource = findResources(xlinkNode.filename).find((resource) => {
        return ["post", "page"].includes(resource.type);
      });

      if (!resource) {
        return Promise.reject(new Error("NotFound"));
      }

      return Promise.resolve({
        ...xlinkNode,
        url: resource.type === "post"
          ? config.posts.permalink(resource.slug)
          : config.pages.permalink(resource.slug),
      });
    },
  };
};

export const preloadAttachmentImages: Preloader = (node) => {
  if (node.type !== "attachment") return null;

  const imageNode = node;

  return {
    key: `image:${imageNode.filename}${imageNode.extension}`,
    query: (_req, _ctx, findResources) => {
      const resource = findResources(imageNode.filename).find((resource) => {
        return resource.type === "image";
      });

      if (!resource) {
        return Promise.reject(new Error("NotFound"));
      }

      return Promise.resolve({
        ...imageNode,
        url: config.images.permalink(resource.slug),
      });
    },
  };
};
