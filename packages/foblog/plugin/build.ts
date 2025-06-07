import { AnyModel, ReadData } from "../lib/model/Model.ts";
import { post } from "../lib/index.ts";
import { Repository } from "../storage/db.ts";
import {
  buildLs,
  findPrevEntry,
  Ls,
  LsEntry,
  LsModel,
  openFile,
  Resource,
  resourcesToDelete,
} from "../storage/disk.ts";
import { path } from "../deps.ts";
import { config } from "./config.ts";

const LsRepository = Repository(LsModel);

export const ContentBuilder = (...models: AnyModel[]) => {
  const runModels = (
    file: ReadData,
    isUpdate: boolean,
  ): Promise<Resource[]> => {
    return Promise.all(models.map((model) => {
      const table = Repository(model);
      if (!model.onRead) return [];

      const resource = model.onRead(file, { isUpdate });
      if (!resource) return Promise.resolve([]);
      const resources = Array.isArray(resource) ? resource : [resource];

      return Promise.all(
        resources.map(async (resource) => {
          await table.upsert(resource.slug, resource);
          if (model.onUpdate && isUpdate) {
            await model.onUpdate(resource);
          }
          if (model.onCreate && !isUpdate) {
            await model.onCreate(resource);
          }
          return {
            type: model.name,
            slug: resource.slug,
          };
        }),
      );
    })).then((results) => results.flat());
  };

  const doFile = async (
    entry: Deno.DirEntry | string,
    compareEntries: (filename: string, extension: string) => LsEntry | null,
  ) => {
    const file = await openFile(entry);
    const prevEntry = compareEntries(file.filename, file.extension);

    const metadata = {
      basename: file.filename,
      extension: file.extension,
      checksum: file.checksum,
    };

    if (!prevEntry) {
      const resources = await runModels(file, false);
      return {
        ...metadata,
        resources,
      };
    }

    if (prevEntry.checksum !== file.checksum) {
      const resources = await runModels(file, true);
      return {
        ...metadata,
        resources,
      };
    }

    return prevEntry;
  };

  const deleteResource = async (resource: Resource) => {
    const model = models.find((model) => model.name === resource.type);
    if (!model) return;
    await Repository(model).remove(resource.slug);

    if (model.onDelete) {
      await model.onDelete(resource.slug);
    }
    return true;
  };

  const doIt = async () => {
    const prevLs = await LsRepository.get("ls");
    const compareEntries = findPrevEntry(prevLs);

    const nextLs: Ls = await buildLs((entry) => {
      return doFile(entry, compareEntries);
    });

    await Promise.all(
      resourcesToDelete(prevLs, nextLs).map((resource) => {
        return deleteResource(resource);
      }),
    );

    await LsRepository.upsert("ls", nextLs);

    return nextLs;
  };

  return {
    build: (isProduction?: boolean) =>
      doIt().catch(handleBuildError(isProduction)),

    watch: async (
      onChange: (digest: string, watcher: Deno.FsWatcher) => void,
    ) => {
      const prevLs = await LsRepository.get("ls");
      const compareEntries = findPrevEntry(prevLs);

      const watcher = Deno.watchFs(path.join(Deno.cwd(), config.contentDir));

      for await (const entry of watcher) {
      }
    },
  };
};

export const handleBuildError =
  (isProduction?: boolean) => (error: Error | unknown) => {
    console.error("foblog build error", error);

    if (isProduction) {
      throw error;
    }

    return false;
  };

export const contentBuilder = ContentBuilder(post);
