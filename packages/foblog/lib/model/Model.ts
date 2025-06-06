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

interface BaseSchema {
  slug: string;
}

export interface Model<S extends BaseSchema> {
  name: string;

  schema: z.Schema<S>;

  onRead?: (file: ReadData, opts: OnReadOptions) => S | [] | null;

  onCreate?: (resource: S) => Promise<void>;

  onUpdate?: (resource: S) => Promise<void>;

  onDelete?: (slug: string) => Promise<void>;
}

// deno-lint-ignore no-explicit-any
export type AnyModel = Model<BaseSchema & any>;
