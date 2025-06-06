import { z } from "../../../deps.ts";
import { config } from "../../../plugin/config.ts";
import { Repository } from "../../../storage/db.ts";
import { paginate } from "./index.ts";
import { Pagination } from "./pagination.ts";
import { post, PostTy } from "./post.ts";

export interface BlogList {
  posts: PostTy[];
  pagination: Pagination;
}

export const getBlogList = async (page = 1): Promise<BlogList> => {
  const all = await Repository(post).getAll();
  const pagination = paginate(all, config.posts.listPostsPerPage)(page);
  return {
    posts: all.slice(pagination.params.skip, pagination.params.limit + 1),
    pagination,
  };
};
