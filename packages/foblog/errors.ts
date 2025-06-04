import { config } from "./plugin/config.ts";

export const warn = (message: string) => {
  if (config.developerWarnings) {
    console.warn(`Foblog: ${message}`);
  }
};

export const getErrorMessage = (error: Error | unknown) => {
  return (error instanceof Error) ? error.message : "Unknown error";
};
