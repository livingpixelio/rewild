import { remarkFrontmatter, remarkParse, unified, visit } from "../../deps.ts";
import { MdastNode, ParentOfText, Root } from "./MdastNode.ts";

import { parseCaption } from "./custom.ts";

const transformTextNode = (
  node: MdastNode,
  idx: number | undefined,
  parent: ParentOfText | undefined,
) => {
  if (node.type !== "text") {
    return;
  }

  const { value } = node;

  const newNodes = parseCaption(value);

  if (
    !newNodes ||
    (newNodes.length === 1 && newNodes[0].type === "text") ||
    !parent ||
    !idx
  ) {
    return;
  }

  parent.children.splice(idx, 1, ...newNodes);

  parent.children.forEach((child, idx) => {
    transformTextNode(child, idx, parent);
  });
};

const pipeline = unified()
  // @ts-ignore: remarkParse definitions are not correct
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(function () {
    return function (tree: Root) {
      visit(tree, "text", transformTextNode);
    };
  }).use(function toCompiler() {
    const compiler = (node: Root) => node;

    // @ts-ignore : unified's types sometimes really suck
    this.compiler = compiler;
  });

export const parseMd = (md: string) => {
  return pipeline.processSync(md).result as Root;
};
