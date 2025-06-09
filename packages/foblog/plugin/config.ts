import { Author } from "../mod.ts";

export interface PluginConfig {
  developerWarnings: boolean;
  contentDir: string;

  siteUrl?: string;
  siteTitle?: string;
  siteDescription?: string;
  siteMainAuthor?: Author;

  posts: {
    permalink: (slug: string) => string;
    feedUrl: string;
  };

  pages: {
    permalink: (path: string) => string;
  };

  images: {
    sizes: number[];
  };

  favicon: string;
}

const DEFAULT_CONFIG: PluginConfig = {
  developerWarnings: true,
  contentDir: "content",

  posts: {
    permalink: (slug) => `/blog/${slug}`,
    feedUrl: `/feed.json`,
  },

  pages: {
    permalink: (path) => path,
  },

  images: { sizes: Array(10).fill(null).map((_, idx) => (idx + 1) * 200) },

  favicon: "/favicon.ico",
};

export type ConfigSetter =
  | Partial<PluginConfig>
  | ((defaultConfig: PluginConfig) => PluginConfig);

export let config: PluginConfig = DEFAULT_CONFIG;

export const setConfig = (
  setConfig: ConfigSetter,
) => {
  if (typeof setConfig === "function") {
    config = setConfig(DEFAULT_CONFIG);
    return config;
  }
  config = {
    ...DEFAULT_CONFIG,
    ...setConfig,
  };
  return config;
};
