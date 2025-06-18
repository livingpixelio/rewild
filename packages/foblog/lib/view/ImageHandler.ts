import { Handler } from "$fresh/server.ts";
import { FreshContext, z } from "../../deps.ts";
import { getErrorMessage, HttpError, warn } from "../../errors.ts";
import { parseQuery } from "../../parsers/index.ts";
import { Repository } from "../../storage/db.ts";
import { getAttachmentPath, getContentPath } from "../../storage/disk.ts";
import { image } from "../model/index.ts";

interface ImageParams {
  slug: string;
  width?: number;
}

interface ImageHandlerOptions {
  decodeUrl: (url: string | URL, context: FreshContext) => ImageParams;
}

const queryParser = parseQuery(z.object({
  width: z.coerce.number().optional(),
}));

const defaultImageHandlerOptions: ImageHandlerOptions = {
  decodeUrl: (url, context) => {
    const _url = typeof url === "string" ? new URL(url) : url;
    const parsedQuery = queryParser(_url.search);
    const slug = context.params.slug;
    return {
      slug,
      width: parsedQuery.width,
    };
  },
};

export const ImageHandler = (
  options?: Partial<ImageHandlerOptions>,
): Handler => {
  const { decodeUrl } = {
    ...defaultImageHandlerOptions,
    ...options,
  };

  return async (request, context) => {
    let params: ImageParams;
    try {
      params = decodeUrl(request.url, context);
    } catch (err) {
      warn(getErrorMessage(err));
      const httpError = new HttpError(
        400,
        `Unable to parse URL ${request.url}`,
      );
      return httpError.toHttp();
    }

    const imageData = await Repository(image).get(params.slug);

    if (!imageData) {
      warn(`Image ${params.slug} not found`);
      return new HttpError(404).toHttp();
    }

    const sizes = imageData.sizes.slice().sort((a, b) => a.size - b.size);
    const size = typeof params.width === "number"
      ? sizes.find((size) => size.size >= (params.width as number))
      : null;

    const attachmentPath = size ? getAttachmentPath(size?.filename) : null;
    console.log(attachmentPath);

    const filepath = (size && attachmentPath)
      ? attachmentPath
      : getContentPath(imageData.originalFilename);

    const file = await Deno.open(filepath, { read: true });
    return new Response(file.readable);
  };
};
