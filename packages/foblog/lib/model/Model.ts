import { z } from "../../deps.ts";

export interface ReadData {
  filename: string;
  extension: string;
  defaultSlug: string;
  data: Uint8Array;
}

interface OnReadOptions {
  isUpdate: boolean;
}

export interface Model<S extends { slug: string }> {
  name: string;

  schema: z.Schema<S>;

  onRead?: (file: ReadData, opts: OnReadOptions) => Promise<S | S[]>;

  onCreate?: (resource: S) => void;

  onUpdate?: (resource: S) => void;

  onDelete?: (slug: string) => void;
}

// deno-lint-ignore no-explicit-any
export type AnyModel = Model<{ slug: string & Record<string, any> }>;
