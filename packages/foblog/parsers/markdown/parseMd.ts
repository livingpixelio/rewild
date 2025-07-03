import { remarkFrontmatter, remarkParse, unified } from "../../deps.ts";
import { Root } from "./MdastNode.ts";

const pipeline = unified()
  // @ts-ignore: remarkParse definitions are not correct
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"]);

export const parseMd = (md: string) => {
  return pipeline.parse(md) as Root;
};
