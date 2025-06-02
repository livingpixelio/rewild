import { z } from "../../deps.ts";

interface OnReadOptions {
  isUpdate: boolean;
  createStaticFile: (filename: string, data: Uint8Array) => Promise<boolean>;
}

export interface Model<S extends { slug: string }> {
  name: string;

  schema: z.Schema<S>;

  onRead?: (fullPath: string, opts: OnReadOptions) => Promise<S | S[]>;
}

// deno-lint-ignore no-explicit-any
export type AnyModel = Model<{ slug: string & Record<string, any> }>;
