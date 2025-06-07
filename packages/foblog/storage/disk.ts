import { crypto, encodeHex, path, z } from "../deps.ts";
import { Model } from "../lib/model/Model.ts";
import { config } from "../plugin/config.ts";
import { slugify } from "../parsers/index.ts";

const CONTENT_DIR = path.join(Deno.cwd(), config.contentDir);

const LsSchema = z.object({
  slug: z.string(),
  files: z.array(z.object({
    basename: z.string(),
    extension: z.string(),
    checksum: z.string(),
    resources: z.array(z.object({
      type: z.string(),
      slug: z.string(),
    })),
  })),
});

export type Ls = z.infer<typeof LsSchema>;
export type LsEntry = Ls["files"][number];
export type Resource = LsEntry["resources"][number];

export const LsModel: Model<Ls> = {
  name: "ls",
  schema: LsSchema,
};

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
    if (!dirEntry.isFile) {
      continue;
    }
    const lsEntry = await forEachFile(dirEntry);
    entries = [...entries, lsEntry];
  }

  const finishTime: number = Date.now();

  return {
    slug: `${finishTime}`,
    files: entries,
  };
};

export const openFile = async (entry: Deno.DirEntry | string) => {
  const fullPath = typeof entry === "string"
    ? entry
    : path.join(CONTENT_DIR, entry.name);
  const extension = path.extname(fullPath);
  const filename = path.basename(fullPath, path.extname(fullPath));
  const data = await Deno.readFile(fullPath);
  const checksum = await getChecksum(data);
  const defaultSlug = slugify(filename);
  return {
    filename,
    extension,
    defaultSlug,
    checksum,
    data,
  };
};

export const findPrevEntry = (prev: Ls | null) =>
(
  basename: string,
  extension: string,
): LsEntry | null => {
  return prev?.files.find((entry) =>
    entry.basename == basename && entry.extension === extension
  ) || null;
};

const smooshResources = (ls: Ls): Resource[] => {
  return ls.files.reduce((acc, file) => {
    return [...acc, ...file.resources];
  }, [] as Resource[]);
};

export const resourcesToDelete = (
  prev: Ls | null,
  next: Ls,
): Resource[] => {
  if (!prev) return [];

  const prevResources = smooshResources(prev);
  const nextResources = smooshResources(next);

  return prevResources.filter((prevItem) =>
    !nextResources.find((nextItem) =>
      prevItem.type === nextItem.type && prevItem.slug === nextItem.slug
    )
  );
};
