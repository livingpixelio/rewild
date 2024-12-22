import { WfHead } from "wordfresh";
import { PageProps } from "$fresh/server.ts";

export default function Home({ url }: PageProps) {
  return (
    <>
      <WfHead url={url} />
      <div class="px-4 py-20 mx-auto bg-dark text-white">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold text-info">
            OptOut
          </h1>
          <p class="my-4">
            An experiment in rewilding the internet.
          </p>
        </div>
      </div>
    </>
  );
}
