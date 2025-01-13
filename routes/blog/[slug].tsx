import { PageProps } from "$fresh/server.ts";
import { CreateMd, Icon, PostHandler, PostHandlerProps } from "wordfresh";

import { ArrowLeft } from "../../components/icons.tsx";
import { postDate } from "../../lib/datetime.ts";
import { Wrapper } from "../../components/Wrapper.tsx";
import { BannerImage } from "../../islands/BannerImage.tsx";

export const handler = PostHandler();

const Md = CreateMd();

export default function PostPage({ url, data }: PageProps<PostHandlerProps>) {
  return (
    <Wrapper
      url={url}
      pageTitle="Blog"
      pageDescription={data.post.summary}
      pageSocialImage={data.post.image}
    >
      <BannerImage
        src={data.post.banner_image}
        alt={`Banner image for ${data.post.title}`}
      />
      <div class="container max-w-3xl mx-auto">
        <p class="text-xs font-bold my-4">
          <a href="/blog">
            <Icon icon={ArrowLeft} className="mr-2 inline" />
            <span>Blog</span>
          </a>
        </p>

        <h1 class="text-info text-2xl font-bold my-4">
          {data.post.title}
        </h1>
        <p class="text-xs font-bold my-4">
          {postDate(data.post.date_published)}
        </p>

        <hr className="my-4" />

        <div className="content">
          <Md node={data.post.content} wfData={data.wfData} />
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
