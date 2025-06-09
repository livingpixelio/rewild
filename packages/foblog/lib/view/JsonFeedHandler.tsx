import { BlogList, PaginationOptions } from "../model/index.ts";
import { CreateMd, UserDefinedComponents } from "./CreateMd.tsx";
import { config } from "../../plugin/config.ts";
import { Handler } from "$fresh/server.ts";
import { renderToString } from "../../deps.ts";

interface JsonFeedHandlerOptions extends PaginationOptions {
  userDefinedComponents: UserDefinedComponents;
}

const jsonFeedHandlerOptionsDefaults = {
  perPage: 10,
  encodeUrl: (page: number) => `${config.posts.feedUrl}?page=${page}`,
  userDefinedComponents: {},
};

export const JsonFeedHandler = (
  options: Partial<JsonFeedHandlerOptions> = {},
): Handler => {
  const _options = {
    ...jsonFeedHandlerOptionsDefaults,
    ...options,
  };

  const getBlogList = BlogList(_options);

  return async (req) => {
    const { posts, pagination } = await getBlogList(req.url);

    const Md = CreateMd(_options.userDefinedComponents);

    // TODO: content_html: preact render to string; remove whitespace and escape
    // line endings (JSON.stringify may do that automatically?)
    const feed = {
      version: "https://jsonfeed.org/version/1",
      title: config.siteTitle,
      home_page_url: config.siteUrl,
      feed_url: config.posts.feedUrl,
      description: config.siteDescription,
      favicon: config.siteUrl ? `${config.siteUrl}/favicon.ico` : undefined,
      author: config.siteMainAuthor,
      next_url: pagination.url.next,
      items: posts.map((post) => {
        return {
          id: post.slug,
          url: `${config.siteUrl}/blog/${post.slug}`,
          title: post.title,
          content_text: post.content_text,
          content_html: post.content
            ? renderToString(
              <Md
                node={post.content}
                userDefinedComponents={_options.userDefinedComponents}
              />,
            )
            : null,
          summary: post.summary || post.content_text?.slice(0, 240),
          image: post.image,
          banner_image: post.banner_image,
          date_published: post.date_published,
          author: post.author || config.siteMainAuthor,
        };
      }),
    };

    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
