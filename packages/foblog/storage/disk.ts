import { crypto, encodeHex, path, z } from "../deps.ts";
import { Model } from "../lib/model/Model.ts";
import { config } from "../plugin/config.ts";

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

type Ls = z.infer<typeof LsSchema>;
type LsEntry = Ls["files"][number];
type Resource = LsEntry["resources"][number];

const LsModel: Model<Ls> = {
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
    const lsEntry = await forEachFile(dirEntry);
    entries = [...entries, lsEntry];
  }

  const finishTime = Date.now();

  return {
    slug: `${finishTime}`,
    files: entries,
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

export const writeFileToStatic = (filename: string, binary: Uint8Array) =>
  Promise<boolean>;
