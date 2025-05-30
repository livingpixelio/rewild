/// <reference lib="deno.unstable" />

let kv: Deno.Kv;

export const startDb = (db?: Deno.Kv) => {
  if (db) {
    kv = db;
  }
};
