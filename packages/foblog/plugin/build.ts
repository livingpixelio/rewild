import { AnyModel, ReadData } from "../lib/model/Model.ts";
import { Table } from "../storage/db.ts";
import {
  buildLs,
  findPrevEntry,
  Ls,
  LsModel,
  openFile,
  Resource,
} from "../storage/disk.ts";

const LsTable = Table(LsModel);

export const handleBuildError = (error: Error | unknown) => {
  // in dev, log developer warning to console

  // in build/prod, log developer warning and then escale (exit the build)
};

// never run buildResources more than once concurrently
export const doBuild = (models: AnyModel[]) => async () => {
  const runModels = (
    file: ReadData,
    isUpdate: boolean,
  ): Promise<Resource[]> => {
    return Promise.all(models.map((model) => {
      const table = Table(model);
      if (!model.onRead) return Promise.resolve([]);

      return model.onRead(file, { isUpdate }).then((resource) =>
        Array.isArray(resource) ? resource : [resource]
      ).then((resources) =>
        Promise.all(
          resources.map(async (resource) => {
            await table.upsert(resource.slug, resource);
            if (model.onUpdate && isUpdate) {
              model.onUpdate(resource);
            }
            if (model.onCreate && !isUpdate) {
              model.onCreate(resource);
            }
            return {
              type: model.name,
              slug: resource.slug,
            };
          }),
        )
      );
    }))
      .then((results) => results.flat());
  };

  const prevLs = await LsTable.get("ls");
  const compareEntries = findPrevEntry(prevLs);

  const nextLs: Ls = await buildLs((entry) => {
    return openFile(entry).then(async (file) => {
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
    });
  });
};

export const setupListener = () => {};
