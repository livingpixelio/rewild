import { PageProps } from "$fresh/server.ts";
import type { Post } from "foblog";
import { Icon } from "foblog";

import { ArrowLeft } from "../../components/icons.tsx";
import { postDate } from "../../lib/datetime.ts";
import { Wrapper } from "../../components/Wrapper.tsx";
import { BannerImage } from "../../islands/BannerImage.tsx";

export default function PostPage({ url, data }: PageProps<Post>) {
  return (
    <Wrapper
      url={url}
      pageTitle="Blog"
      pageDescription={data.summary}
      pageSocialImage={data.image}
    >
      <BannerImage
        src={data.banner_image}
        alt={`Banner image for ${data.title}`}
      />
      <div class="container max-w-3xl mx-auto">
        <p class="text-xs font-bold my-4">
          <a href="/blog">
            <Icon icon={ArrowLeft} className="mr-2 inline" />
            <span>Blog</span>
          </a>
        </p>

        <h1 class="text-info text-2xl font-bold my-4">
          {data.title}
        </h1>
        <p class="text-xs font-bold my-4">
          {postDate(data.date_published)}
        </p>

        <hr className="my-4" />

        <div className="content">
          <h2>
            <strong>!!! Need to put the md component here !!!</strong>
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
