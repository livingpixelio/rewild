import { crypto, encodeHex, FreshContext, path, z } from "../deps.ts";
import { Model } from "../lib/model/Model.ts";
import { config } from "../plugin/config.ts";
import { exists } from "$std/fs/exists.ts";
import { slugifyAsPath } from "../parsers/index.ts";

const CONTENT_DIR = path.join(Deno.cwd(), config.contentDir);
const IGNORE_DIR = ["templates", ".obsidian"];

export const getContentPath = (filename: string, context?: string) =>
  context
    ? path.join(CONTENT_DIR, context, filename)
    : path.join(CONTENT_DIR, filename);

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
  forEachFile: (entry: Deno.DirEntry, context?: string) => Promise<LsEntry>,
  contentDir = CONTENT_DIR,
): Promise<Ls> => {
  const dir = Deno.readDir(contentDir);

  let entries: LsEntry[] = [];
  for await (const dirEntry of dir) {
    if (dirEntry.isFile) {
      const context = contentDir.replace(CONTENT_DIR, "").slice(1) || undefined;
      const lsEntry = await forEachFile(dirEntry, context);
      entries = [...entries, lsEntry];
    } else if (dirEntry.isDirectory && !IGNORE_DIR.includes(dirEntry.name)) {
      const result = await buildLs(
        forEachFile,
        path.join(contentDir, dirEntry.name),
      );
      entries = [...entries, ...result.files];
    }
  }

  const finishTime: number = Date.now();
  return {
    slug: `${finishTime}`,
    files: entries,
  };
};

export const openFile = async (
  entry: Deno.DirEntry | string,
  context?: string,
) => {
  const fullPath = typeof entry === "string"
    ? entry
    : getContentPath(entry.name, context);

  const extension = path.extname(fullPath);
  const basename = path.basename(fullPath, path.extname(fullPath));
  const filename = context ? path.join(context, basename) : basename;

  const data = await Deno.readFile(fullPath);
  const checksum = await getChecksum(data);
  const defaultSlug = slugifyAsPath(filename);

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

export const getAttachmentPath = (filename: string, context?: FreshContext) => {
  let outDir: string = "";
  if (context?.config.build.outDir) {
    outDir = context?.config.build.outDir;
  } else if (config.freshConfig) {
    outDir = config.freshConfig?.build?.outDir || "";
  }
  if (!outDir) return null;

  return path.join(outDir, config.outDir, filename);
};

export const createOutDirIfNotExists = async () => {
  const { freshConfig, outDir } = config;
  if (!freshConfig?.build?.outDir) return;

  const dirPath = path.join(freshConfig.build.outDir, outDir);

  const outDirExists = await exists(dirPath);
  if (!outDirExists) {
    await Deno.mkdir(dirPath);
  }
};
