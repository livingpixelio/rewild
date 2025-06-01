import { crypto, encodeHex, path } from "../deps.ts";
import { config } from "../plugin/config.ts";

const CONTENT_DIR = path.join(Deno.cwd(), config.contentDir);

interface Ls {
  finishTime: number;
  files: Array<LsEntry>;
}

interface LsEntry {
  basename: string;
  extension: string;
  checksum: string;
  resources: Array<Resource>;
}

interface Resource {
  type: string;
  slug: string;
}

export const getChecksum = async (data: Uint8Array): Promise<string> => {
  const digest = await crypto.subtle.digest("SHA-256", data);
  return encodeHex(digest);
};

export const buildLs = async (
  forEachFile: (entry: Deno.DirEntry) => Promise<LsEntry>,
): Promise<Ls> => {
  const dir = Deno.readDir(CONTENT_DIR);

  let entries: LsEntry[] = [];
  for await (const dirEntry of dir) {
    const lsEntry = await forEachFile(dirEntry);
    entries = [...entries, lsEntry];
  }

  const finishTime = Date.now();

  return {
    finishTime,
    files: entries,
  };
};

export const findPrevEntry =
  (prev: Ls | null) => (basename: string, ext: string): LsEntry | null => {
    return null;
  };

export const resourcesToDelete = (prev: Ls, next: Ls) => {};

export const writeFileToStatic = (filename: string, binary: Uint8Array) =>
  Promise<boolean>;
