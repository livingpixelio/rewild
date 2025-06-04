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

  onRead?: (file: ReadData, opts: OnReadOptions) => S | [];

  onCreate?: (resource: S) => Promise<void>;

  onUpdate?: (resource: S) => Promise<void>;

  onDelete?: (slug: string) => Promise<void>;
}

// deno-lint-ignore no-explicit-any
export type AnyModel = Model<{ slug: string } & Record<string, any>>;
