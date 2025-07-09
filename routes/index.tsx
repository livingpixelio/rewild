import { BlogList, FobHead, Icon } from "foblog";
import { PageProps } from "$fresh/server.ts";
import { ArrowRight } from "../components/icons.tsx";
import Hero from "../islands/Hero.tsx";
import { postDate } from "../lib/datetime.ts";

const getBlogList = BlogList();

export default async function Home({ url }: PageProps) {
  const { posts } = await getBlogList();

  return (
    <>
      <FobHead url={url} />
      <Hero>
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold text-success">
            Rewild
          </h1>
          <p class="my-4">
            Tech that serves humans
          </p>
          <p class="mt-4">
            <a class="text-xl underline mr-8" href="/about">About</a>
            <a class="text-xl underline" href="/wf">How it works</a>
          </p>
        </div>
      </Hero>
      <div class="container max-w-3xl mx-auto">
        <div class="sm:flex flex-row sm:-mx-4">
          <div class="sm:w-[50%] flex-grow-0 flex-shrink-0 sm:mx-4">
            <h2 class="text-info text-2xl font-bold">
              <a href="/blog">
                <span>Blog</span>
                <Icon icon={ArrowRight} className="ml-2 inline" />
              </a>
            </h2>
            {posts.map((post) => (
              <a key={post.slug} class="block my-2" href={`/blog/${post.slug}`}>
                <h3 class="text-primary text-xl">{post.title}</h3>
                <p class="text-sm/tight">{post.summary}</p>
                <p class="text-xs font-bold">{postDate(post.date_published)}</p>
              </a>
            ))}
          </div>

          <div class="sm:w-[50%] flex-grow-0 flex-shrink-0 sm:mx-4">
            <h2 class="text-info text-2xl font-bold">
              Related
            </h2>
            <ul className="text-primary">
              <li className="my-2">
                <a href="https://www.afterbabel.com">After Babel</a>
              </li>
              <li className="my-2">
                <a href="https://calnewport.com/blog">Cal Newport</a>
              </li>
              <li className="my-2">
                <a href="https://www.wheresyoured.at">Where's Your Ed At?</a>
              </li>
              <li className="my-2">
                <a href="https://www.pluralistic.net">Pluralistic</a>
              </li>
              <li className="my-2">
                <a href="https://socialwebfoundation.org/blog/">
                  Social Web Foundation
                </a>
              </li>
              <li className="my-2">
                <a href="https://theluddite.org">
                  The Luddite
                </a>
              </li>
              <li className="my-2">
                <a href="https://wrecka.ge">
                  Wreckage/Salvage
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
