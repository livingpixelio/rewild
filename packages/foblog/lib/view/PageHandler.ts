import { FreshContext, Handler } from "../../deps.ts";
import { getPage, PageTy } from "../index.ts";

interface PageHandlerOptions {
  decodeUrl: (url: string | URL, context: FreshContext) => string;
}

const defaultPageHandlerProps: PageHandlerOptions = {
  decodeUrl(_url, context) {
    const slug = context.params.slug;
    return slug;
  },
};

export interface PageHandlerProps {
  page: PageTy;
}

export const PageHandler = (
  options?: Partial<PageHandlerOptions>,
): Handler<PageHandlerProps> => {
  const { decodeUrl } = { ...defaultPageHandlerProps, ...options };

  return async (request, context) => {
    const slug = decodeUrl(request.url, context);

    const page = await getPage(slug);
    if (!page) {
      return context.renderNotFound();
    }

    return context.render({ page });
  };
};
