// import { ImageHandler } from "foblog";

import { Handler } from "$fresh/server.ts";

// export const handler = ImageHandler();

export const handler: Handler = (_req, ctx) => {
  const config = ctx.config;

  return new Response(
    JSON.stringify({
      config,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
