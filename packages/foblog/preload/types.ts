import { FreshContext } from "../deps.ts";
import { HttpError } from "../errors.ts";
import { MdastNodeTy } from "../parsers/index.ts";
import { Resource } from "../storage/disk.ts";

export interface PreloadPending {
  key: string;
  query: (
    request: Request,
    context: FreshContext,
    findResourcesForFile: (filename: string, extension?: string) => Resource[],
  ) => Promise<MdastNodeTy.MdastNode>;
}

export interface PreloadFulfilled {
  key: string;
  data: MdastNodeTy.MdastNode;
}

export interface PreloadErrored {
  key: string;
  error: Error | HttpError | unknown;
}

export type Preloader = (
  node: MdastNodeTy.MdastNode,
) => PreloadPending | Array<PreloadPending> | null;
