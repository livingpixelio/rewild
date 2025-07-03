import { FreshConfig } from "$fresh/server.ts";
import { Author } from "../mod.ts";
import { stringifyQuery } from "../parsers/index.ts";
import { Preloader } from "../preload/index.ts";

export interface PluginConfig {
  logLevel: "warn" | "verbose" | false;
  contentDir: string;
  outDir: string;

  siteUrl?: string;
  siteTitle?: string;
  siteDescription?: string;
  siteMainAuthor?: Author;
  favicon: string;

  preloaders: Array<Preloader>;

  posts: {
    permalink: (slug: string) => string;
    feedUrl: string;
  };

  pages: {
    permalink: (path: string) => string;
  };

  images: {
    sizes: number[];
    getAttachmentFilename: (
      slug: string,
      extension: string,
      size: number,
    ) => string;
    permalink: (slug: string, width?: number) => string;
  };

  freshConfig?: FreshConfig;
}

const DEFAULT_CONFIG: PluginConfig = {
  logLevel: "verbose",
  contentDir: "content",
  outDir: "fob",

  preloaders: [],

  posts: {
    permalink: (slug) => `/blog/${slug}`,
    feedUrl: `/feed.json`,
  },

  pages: {
    permalink: (path) => path,
  },

  images: {
    sizes: Array(10).fill(null).map((_, idx) => (idx + 1) * 200),
    getAttachmentFilename: (
      slug: string,
      extension: string,
      size: number,
    ) => `${slug}_${size}${extension}`,
    permalink: (slug, width) => {
      const qs = stringifyQuery({ width });
      return `/image/${slug}?${qs}`;
    },
  },

  favicon: "/favicon.ico",
};

export type ConfigSetter =
  | Partial<PluginConfig>
  | ((defaultConfig: PluginConfig) => PluginConfig);

export let config: PluginConfig = DEFAULT_CONFIG;

export const setConfig = (
  configSetter: ConfigSetter,
  freshConfig?: FreshConfig,
) => {
  if (typeof configSetter === "function") {
    config = {
      ...configSetter(DEFAULT_CONFIG),
      freshConfig,
    };
    return config;
  }
  config = {
    ...DEFAULT_CONFIG,
    ...configSetter,
    freshConfig,
  };

  return { ...config, freshConfig };
};
