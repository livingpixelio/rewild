import { AnyModel } from "../lib/model/Model.ts";
import { buildLs } from "../storage/disk.ts";

export const handleBuildError = (error: Error | unknown) => {
  // in dev, log developer warning to console

  // in build/prod, log developer warning and then escale (exit the build)
};

// never run buildResources more than once concurrently
export const buildResources = (models: AnyModel[]) => async () => {
  const prevLs: Ls;

  const nextLs = await buildLs(async (entry) => {
    if (!entry.isFile) {
      return;
    }
  });
};

export const setupListener = () => {};
