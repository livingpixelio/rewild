import { FreshContext } from "../deps.ts";
import { HttpError } from "../errors.ts";
import { MdastNode } from "../parsers/markdown/MdastNode.ts";
import { Ls } from "../storage/disk.ts";

export interface PreloadPending<NodeTy extends MdastNode> {
  key: string;
  query: (
    request: Request,
    context: FreshContext,
    getLs: () => Ls,
  ) => Promise<NodeTy> | null;
}

export interface PreloadFulfilled<NodeTy extends MdastNode>
  extends PreloadPending<NodeTy> {
  data: NodeTy;
}

export interface PreloadErrored<NodeTy extends MdastNode>
  extends PreloadPending<NodeTy> {
  error: Error | HttpError | unknown;
}

export type Preloader = <NodeTy extends MdastNode>(
  node: NodeTy,
) => PreloadPending<NodeTy>;
