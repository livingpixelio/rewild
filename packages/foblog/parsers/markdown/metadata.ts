import { parseYaml } from "../../deps.ts";
import { isLeaf } from "./MdastNode.ts";

import type { PostTy } from "../../lib/index.ts";
import type { MdastNode, Root, Text, Yaml } from "./MdastNode.ts";

export const flattenTree = (tree: MdastNode): MdastNode[] => {
  let nodes: MdastNode[] = [];

  const recur = (node: MdastNode) => {
    nodes = [...nodes, node];
    if (!isLeaf(node)) {
      node.children.forEach((node) => recur(node));
    }
  };
  recur(tree);

  return nodes;
};

export const selectNodes =
  (nodes: MdastNode[]) => <T extends MdastNode>(...types: string[]) => {
    return nodes.filter((node) => types.includes(node.type)) as T[];
  };

const normalDate = (date?: string) =>
  date ? new Date(date).toISOString() : undefined;

export const getContentType = (content: Root): string | undefined => {
  const selector = selectNodes(flattenTree(content));
  const yaml = selector<Yaml>("yaml");
  // deno-lint-ignore no-explicit-any
  const data = yaml?.length ? parseYaml(yaml[0].value) : {} as any;
  return data.type || undefined;
};

export const getPostMetadata = (content: Root): Partial<PostTy> => {
  const selector = selectNodes(flattenTree(content));
  const yaml = selector<Yaml>("yaml");

  // deno-lint-ignore no-explicit-any
  const data = yaml?.length ? parseYaml(yaml[0].value) : {} as any;

  const content_text = selector<Text>("text")
    .map((node) => node.value)
    .join("\n\n");

  return {
    summary: data.summary || undefined,
    image: data.image || undefined,
    banner_image: data.banner_image || undefined,
    date_published: normalDate(data.date_published) || undefined,
    external_url: data.external_url || undefined,
    content_text,
  };
};
