import { Pagination } from "./pagination.ts";
import { PostTy } from "./post.ts";

export interface BlogList {
  posts: PostTy[];
  pagination: Pagination;
}

export const getBlogList = (page = 1): Promise<BlogList> => {
  return Promise.resolve({});
};
