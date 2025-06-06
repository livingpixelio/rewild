import { Handler, PageProps } from "$fresh/server.ts";
import type { PostTy } from "foblog";
import { CreateMd, getPost, Icon } from "foblog";

import { ArrowLeft } from "../../components/icons.tsx";
import { postDate } from "../../lib/datetime.ts";
import { Wrapper } from "../../components/Wrapper.tsx";
import { BannerImage } from "../../islands/BannerImage.tsx";

interface Props {
  post: PostTy;
}

export const handler: Handler<Props> = async (_req, ctx) => {
  const post = await getPost(ctx.params.slug);
  if (!post) {
    return ctx.renderNotFound();
  }
  return ctx.render({ post });
};

const Md = CreateMd();

export default function PostPage({ url, data }: PageProps<Props>) {
  const { post } = data;

  return (
    <Wrapper
      url={url}
      pageTitle="Blog"
      pageDescription={post.summary}
      pageSocialImage={post.image}
    >
      <BannerImage
        src={post.banner_image}
        alt={`Banner image for ${post.title}`}
      />
      <div class="container max-w-3xl mx-auto">
        <p class="text-xs font-bold my-4">
          <a href="/blog">
            <Icon icon={ArrowLeft} className="mr-2 inline" />
            <span>Blog</span>
          </a>
        </p>

        <h1 class="text-info text-2xl font-bold my-4">
          {post.title}
        </h1>
        <p class="text-xs font-bold my-4">
          {postDate(post.date_published)}
        </p>

        <hr className="my-4" />

        <div className="content">
          <h2>
            <Md node={post.content} />
          </h2>
        </div>

        <hr className="my-4" />

        <p class="text-xs font-bold my-4">
          <a href="/blog">
            <Icon icon={ArrowLeft} className="mr-2 inline" />
            <span>Blog</span>
          </a>
        </p>
      </div>
    </Wrapper>
  );
}
