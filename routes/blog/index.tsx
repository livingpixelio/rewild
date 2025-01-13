import { Handler, PageProps } from "$fresh/server.ts";
import { BlogHandler, BlogHandlerProps } from "wordfresh";
import { Paginator } from "wordfresh/client/Paginator.tsx";
import { postDate } from "../../lib/datetime.ts";
import { Wrapper } from "../../components/Wrapper.tsx";

export const handler: Handler = BlogHandler(20);

export default function BlogPage({ url, data }: PageProps<BlogHandlerProps>) {
  return (
    <Wrapper url={url} pageTitle="Blog">
      <div class="container max-w-3xl mx-auto">
        <h1 class="text-info text-2xl font-bold my-4">
          Blog
        </h1>

        <hr className="my-4" />

        {data.items.map((post) => (
          <a key={post.slug} class="block my-2" href={`/blog/${post.slug}`}>
            <h3 class="text-primary text-xl">{post.title}</h3>
            <p class="text-sm/tight">{post.summary}</p>
            <p class="text-xs font-bold">{postDate(post.date_published)}</p>
          </a>
        ))}

        <hr className="my-4" />

        <Paginator
          {...data.pagination}
          className={{
            root: "flex flex-row items-center",
            button: "text-md text-info",
            disabledButton: "opacity-50",
            text: "m-0 flex-grow text-center",
          }}
        />
      </div>
    </Wrapper>
  );
}
