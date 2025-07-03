import {
  Literal,
  Node,
  remarkFrontmatter,
  remarkParse,
  Transformer,
  unified,
  visit,
} from "../../deps.ts";
import { MdastNode, Root } from "./MdastNode.ts";

const createTextVisit =
  (...parsers: Array<(input: string) => MdastNode[]>) => (tree: Node) => {
    parsers.forEach((parser) => {
      visit(tree, ["text"], (node, i, parent) => {
        if (node.type !== "text") {
          return;
        }

        const { value } = node as Literal;

        const newNodes = parser(value as string);

        if (newNodes.length === 1 && newNodes[0].type === "text") {
          return;
        }

        // deno-lint-ignore no-explicit-any
        (parent as MdastNode as any).children.splice(i!, 1, ...newNodes);
      });
    });
  };

function customParsers(): Transformer {
  return createTextVisit();
}

const pipeline = unified()
  // @ts-ignore: remarkParse definitions are not correct
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"]);

export const parseMd = (md: string) => {
  return pipeline.parse(md) as Root;
};
