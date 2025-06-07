import { Author } from "../mod.ts";

export interface PluginConfig {
  developerWarnings: boolean;
  contentDir: string;

  siteUrl?: string;
  siteTitle?: string;
  siteDescription?: string;
  siteMainAuthor?: Author;

  posts: {
    listUrl: (page: number) => string;
    listPostsPerPage: number;
    permalink: (slug: string) => string;
    feedUrl: string;
    feedPostsPerPage: number;
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
    listUrl: (page) => page === 1 ? `/blog` : `/blog?page=${page}`,
    listPostsPerPage: 10,
    permalink: (slug) => `/blog/${slug}`,
    feedUrl: `/feed.json`,
    feedPostsPerPage: 10,
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
