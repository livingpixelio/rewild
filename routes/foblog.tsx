import { FunctionComponent } from "preact";
import { Wrapper } from "../components/Wrapper.tsx";
import { PageProps } from "fresh";
import { Network } from "../islands/Network.tsx";
import { FeatureList } from "../islands/FeatureList.tsx";

const WfPage: FunctionComponent<PageProps> = ({ url }) => {
  return (
    <Wrapper url={url} pageTitle="About Foblog">
      <article class="py-10">
        <div class="container max-w-3xl mx-auto">
          <h1 class="text-3xl text-info font-bold my-4">About Foblog</h1>
          <p class="my-4">
            The web has always been a social network unto itself - a distributed
            network of independently owned sites connected by hyperlinks. The
            blogging stacks that appeared in the early 2000s made participation
            in this network accessible to non-programmers as well. The dominant
            player in this space for a long, long time has been WordPress, which
            for all of its flaws still runs about one quarter of the web.
          </p>
          <p class="my-4">
            If one wants to own their own content, one needs a web stack to
            place it on. Raw-dogged HTML/CSS, WordPress, static-site generators,
            and blogging stacks rolled out of more complex frameworks ... the
            choices seem endless.{" "}
            <strong class="text-primary">
              While evaluating these choices,
            </strong>{" "}
            however, I came to a startling conclusion: the selling points for
            each framework invariably focus on the website itself. What they
            miss is how that website will participate in a broader network. They
            focus on the tree, but what I care about is the forest.
          </p>
        </div>

        <Network />

        <div class="container max-w-3xl mx-auto">
          <p class="my-4">
            The mechanisms for connecting a website with the broader internet
            are considerably more complex than they were for 90s webmasters and
            for 2000s bloggers. My aim was a blogging stack that made these
            mechanisms first-class citizens, instead of having to seek out a
            separate plugin or add-on to satisfy each of them. Some examples:
          </p>

          <FeatureList />

          <p class="my-4">
            Since nothing I found ticks all these boxes, I am putting together
            my own. As I flesh it out, I will attempt to make it available to
            others who wish to rewild their own work.
          </p>
          <p class="my-4">
            The basis of the stack is Fresh, billed as "The framework so easy
            you already know it." Fresh is built on an island architecture, so
            the amount of JavaScript delivered to the client is non-existent
            unless you need frontend interactivity. Nevertheless, pages are
            authored using JSX, a templating language that blends HTML and
            JavaScript in a beautiful and expressive way.
          </p>
          <p class="my-4">
            What I had to add to Fresh (as a plugin) was all the stuff necessary
            for blogging. Posts and pages are authored in markdown, custom post
            types as Zod definitions, JSONFeed is provided as a Fresh handler,
            images are resized (automatically) with ImageMagick. Fresh (and
            Deno, the JavaScript runtime that powers it) turn out to be
            wonderful places to experiment with all of this stuff, and
            developing was fairly straightforward and did not result in the
            bloat or unnecessary complexity we've come to accept from other
            authoring environments.
          </p>
          <p class="my-4">
            Foblog is not a "content management system." I use Obsidian to
            author posts, and you have to write (some) code to do it at this
            point. In this sense, it is more like Gatsby than WordPress. I
            strongly believe that the web is for everyone, but the code-driven
            foundation has to come before the CMS castle. Foblog is fully open
            source, and a CMS can be always be put on top of it if anyone wants
            to get involved.
          </p>
          <p class="my-4">
            I will talk about further improvements to the system in the{" "}
            <a class="text-info font-bold" href="/blog">blog</a>. You can also
            have a look at the{" "}
            <a
              href="https://github.com/livingpixelio/foblog"
              class="text-info font-bold"
            >
              GitHub repo
            </a>, though fully documenting it is something that take time.
          </p>
        </div>
      </article>
    </Wrapper>
  );
};

export default WfPage;
