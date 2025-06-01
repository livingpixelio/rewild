import { z } from "../../deps.ts";
import { Mdast } from "../../parsers/index.ts";

export const PostSchema = z.object({
  slug: z.string(),
  title: z.string().optional(),
  summary: z.string().optional(),
  content: z.unknown(),
  content_text: z.string().optional(),
  image: z.string().optional(),
  banner_image: z.string().optional(),
  date_published: z.string().optional(),
  date_modified: z.string().optional(),
  external_url: z.string().optional(),
  author: z
    .object({
      name: z.string().optional(),
      url: z.string().optional(),
      avatar: z.string().optional(),
    })
    .optional(),
  wf: z.array(z.string()),
});

export interface Author {
  name?: string;
  url?: string;
  avatar?: string;
}

export interface Post extends z.infer<typeof PostSchema> {
  content: Mdast.Root;
}

export interface Pagination {
  page: number;
  totalPages: number | null;
  params: {
    limit: number;
    skip: number;
  };
  url: {
    first: string | null;
    prev: string | null;
    next: string | null;
    last: string | null;
  };
  summary: {
    from: number;
    to: number;
    of: number | null;
  };
}

export interface BlogList {
  posts: Post[];
  pagination: Pagination;
}

export const getBlogList = async (page = 1): Promise<BlogList> => {
};
