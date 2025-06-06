import { PostTy } from "./post.ts";
import { config } from "../../../plugin/config.ts";

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

export const paginate =
  (posts: PostTy[], perPage: number) => (page = 1): Pagination => {
    const total: number = posts.length;

    const totalPages = Math.ceil(total / perPage);
    const isFirstPage = page < 2;
    const isLastPage = page >= totalPages;

    return {
      page,
      totalPages,
      params: {
        limit: perPage,
        skip: (page - 1) * perPage,
      },
      url: {
        first: isFirstPage ? null : config.posts.listUrl(1),
        prev: isFirstPage ? null : config.posts.listUrl(page - 1),
        next: isLastPage ? null : config.posts.listUrl(page + 1),
        last: isLastPage ? null : config.posts.listUrl(total),
      },
      summary: {
        from: (page - 1) * perPage + 1,
        to: total ? Math.min(perPage * page, total) : perPage * page,
        of: total || null,
      },
    };
  };
